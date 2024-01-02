// Table without: 1) checkbox 2) row deletion 3) label update

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/components/ui/data-table/hooks/use-data-table"
import { DataTable } from "@/components/ui/data-table/components/data-table"
import { fetchReposTableColumnDefs, searchableColumns } from "@/components/ui/repo-data-table/table-column-def";
import { getRepos } from "./actions/actions";
import { Repo } from "./table-data-schema";
import { DataTableSkeleton } from "../data-table/components/data-table-skeleton";

export function RepoDataTable() {
    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<Repo, unknown>[]>(
        () => fetchReposTableColumnDefs(),
        []
    )

    const { dataTable, isLoadingData } = useDataTable({
        columns,
        searchableColumns,
        fetchTableData: getRepos
    })

    if (isLoadingData) return <DataTableSkeleton columnCount={4} filterableColumnCount={2} />

    return (
        <DataTable
            dataTable={dataTable}
            columns={columns}
            // Render notion like filters
            advancedFilter={false}
            // Render dynamic faceted filters
            filterableColumns={undefined}
            // Render dynamic searchable filters
            searchableColumns={searchableColumns}
            // Render floating action controls at the bottom of the table on Row selection
            // floatingBarContent={TasksTableFloatingBarContent(dataTable)}
            // Delete selected rows
            // deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
            isLoadingData={isLoadingData}
        />
    )
}
