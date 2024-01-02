// Table without: 1) checkbox 2) row deletion 3) label update

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/components/ui/data-table/hooks/use-data-table"
import { DataTable } from "@/components/ui/data-table/components/data-table"
import { fetchTasksTableColumnDefs } from "./table-column-def-example";
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/components/ui/data-table/types";

interface BasicDataTableProps<TData> {
    data: TData[];
    pageCount: number;
    filterableColumns: DataTableFilterableColumn<TData>[];
    searchableColumns: DataTableSearchableColumn<TData>[];
}

export function BasicDataTable<TData>({ data, pageCount, filterableColumns, searchableColumns }: BasicDataTableProps<TData>) {
    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<TData, unknown>[]>(
        () => fetchTasksTableColumnDefs(),
        []
    )

    const { dataTable } = useDataTable({
        columns,
        data,
        pageCount,
        filterableColumns,
        searchableColumns,
    })

    return (
        <DataTable
            dataTable={dataTable}
            columns={columns}
            // Render notion like filters
            advancedFilter={false}
            // Render dynamic faceted filters
            filterableColumns={filterableColumns}
            // Render dynamic searchable filters
            searchableColumns={searchableColumns}
        // Render floating action controls at the bottom of the table on Row selection
        // floatingBarContent={TasksTableFloatingBarContent(dataTable)}
        // Delete selected rows
        // deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
        />
    )
}
