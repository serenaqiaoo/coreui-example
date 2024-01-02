import * as React from "react"
import type {
    DataTableFilterableColumn,
    DataTableSearchableColumn,
} from "@/components/ui/data-table/types"
import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"

export interface SearchCriteriaForColumn {
    columnName: string; // For column "title",
    queryValue: string; // I want to search all rows that has "title" contains queryValue
}

export interface FilterCriteriaForColumn {
    columnName: string; // For column "status",
    requiredValues: string[]; // I want to filter all rows that has status of any value in filterValue
}

export interface FetchTableDataPayload {
    pageIndex: number;
    pageSize: number;
    sorting?: SortingState;
    searchCriteriaList?: SearchCriteriaForColumn[];
    filterCriteriaList?: FilterCriteriaForColumn[];
}

export interface FetchTableDataResponse<TData> {
    data: TData[];
    pageCount: number;
}

interface UseDataTableProps<TData, TValue> {
    // TData is {}, single row of data
    columns: ColumnDef<TData, TValue>[];
    // data: TData[]; no need to have it as prop, as this hook will calculate data and return it.
    // pageCount: number; no need to have it as prop, as this hook will calculate data and return it.
    page?: number;
    perPage?: number;
    sort?: string; // sort cretira
    filterableColumns?: DataTableFilterableColumn<TData>[]; // columns filters on table toolbar
    searchableColumns?: DataTableSearchableColumn<TData>[]; // the columns we use for global search on table toolbar
    fetchTableData: (payload: FetchTableDataPayload) => Promise<FetchTableDataResponse<TData>>;
}

export function useDataTable<TData, TValue>({
    columns,
    page = 1,
    perPage = 10,
    sort,
    filterableColumns = [],
    searchableColumns = [],
    fetchTableData,
}: UseDataTableProps<TData, TValue>) {

    const fallbackPage = isNaN(page) || page < 1 ? 1 : page
    const fallbackPerPage = isNaN(perPage) ? 10 : perPage
    const [column, order] = sort?.split(".") ?? []

    // Table states
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [searchCriteriaList, setSearchCriteriaList] = React.useState<SearchCriteriaForColumn[]>([])
    const [filterCriteriaList, setFilterCriteriaList] = React.useState<FilterCriteriaForColumn[]>([])
    const [data, setData] = React.useState<TData[]>([])
    const [pageCount, setPageCount] = React.useState<number>();
    const [isLoadingData, setIsLoadingData] = React.useState<boolean>(false);
    const [tableColumns, setTableColumns] = React.useState<ColumnDef<TData, any>[]>(columns);

    // Handle server-side pagination
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: fallbackPage - 1,
            pageSize: fallbackPerPage,
        })

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    React.useEffect(() => {
        setPagination({
            pageIndex: fallbackPage - 1,
            pageSize: fallbackPerPage,
        })
    }, [fallbackPage, fallbackPerPage])

    // Handle server-side sorting
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: column ?? "",
            desc: order === "desc",
        },
    ])

    // Handle server-side searching
    const debouncedSearchableColumnFilters = JSON.parse(
        useDebounce(
            JSON.stringify(
                columnFilters.filter((filter) => {
                    return searchableColumns.find((column) => column.id === filter.id)
                })
            ),
            500
        )
    ) as ColumnFiltersState

    React.useEffect(() => {
        // Find all the columns's filters that we want to do search based on
        for (const column of debouncedSearchableColumnFilters) {
            if (typeof column.value === "string") {
                // router.push(
                //     `${pathname}?${createQueryString({
                //         page: 1,
                //         [column.id]: typeof column.value === "string" ? column.value : null,
                //     })}`
                // )
                setPagination(old => ({ ...old, page: 1 }))
                setSearchCriteriaList(old => (old.concat([{ columnName: column.id, queryValue: column.value as string }])))
            }
        }

        // When the search query is empty, reset the filter criteria
        searchCriteriaList.map(searchCriteria => {
            if (
                searchableColumns.find((column) => column.id === searchCriteria.columnName) &&
                !debouncedSearchableColumnFilters.find((column) => column.id === searchCriteria.columnName)
            ) {
                // router.push(
                //     `${pathname}?${createQueryString({
                //         page: 1,
                //         [key]: null,
                //     })}`
                // )
                setPagination(old => ({ ...old, page: 1 }))
                setSearchCriteriaList(old => (old.filter(oldSearchCriteria => oldSearchCriteria.columnName !== searchCriteria.columnName)))
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(debouncedSearchableColumnFilters)])


    // Handle server-side filtering: row selecting based on filter value for columns
    // eg, status column, user can select multiple filter value for the column,
    // like show status in ['todo', 'progress']

    const filterableColumnFilters = columnFilters.filter((filter) => {
        // Find all the columns's filters that we want to do filter based on
        return filterableColumns.find((column) => column.id === filter.id)
    })

    React.useEffect(() => {
        for (const column of filterableColumnFilters) {
            if (typeof column.value === "object" && Array.isArray(column.value)) {
                // router.push(
                //     `${pathname}?${createQueryString({
                //         page: 1,
                //         [column.id]: column.value.join("."),
                //     })}`
                // )
                setPagination(old => ({ ...old, page: 1 }))
                setFilterCriteriaList(old => (old.concat([{ columnName: column.id, requiredValues: column.value as string[] }])))
            }
        }

        // When the column filter is empty, reset the filter criteria
        filterCriteriaList.map(filterCriteria => {
            if (
                filterableColumns.find((column) => column.id === filterCriteria.columnName) &&
                !filterableColumnFilters.find((column) => column.id === filterCriteria.columnName)
            ) {
                // router.push(
                //     `${pathname}?${createQueryString({
                //         page: 1,
                //         [key]: null,
                //     })}`
                // )
                setPagination(old => ({ ...old, page: 1 }))
                setFilterCriteriaList(old => (old.filter(oldFilterCriteria => oldFilterCriteria.columnName !== filterCriteria.columnName)))
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filterableColumnFilters)])

    // Refetch data based on status changes (including pagination, search, filter, sort)
    React.useEffect(() => {
        console.log('pageIndex', pageIndex);
        const fetchData = async () => {
            console.log('Fetching table data...');
            setIsLoadingData(true);
            const response = await fetchTableData({
                pageIndex: pageIndex,
                pageSize: pageSize,
                sorting: sorting,
                searchCriteriaList: searchCriteriaList,
                filterCriteriaList: filterCriteriaList,
            });
            setData(response.data);
            setPageCount(response.pageCount);
            setIsLoadingData(false);
        }
        fetchData()
    }, [pageIndex, pageSize, sorting, searchCriteriaList, filterCriteriaList])

    // Render skeleton while loading data
    React.useEffect(() => {
        if (isLoadingData)
            setTableColumns(columns.map((column) => ({
                ...column,
                Cell: <Skeleton />,
            })))
        else setTableColumns(columns)
    }, [isLoadingData])



    const dataTable = useReactTable({
        data,
        columns: tableColumns,
        pageCount: pageCount ?? -1,
        state: {
            pagination,
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    })

    return { dataTable, isLoadingData }
}
