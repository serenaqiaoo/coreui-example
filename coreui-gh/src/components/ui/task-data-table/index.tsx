import * as React from "react"
import { type Task } from "@/components/ui/task-data-table/task-data-schema"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/components/ui/data-table/hooks/use-data-table"
import { DataTable } from "@/components/ui/data-table/components/data-table"

import { deleteSelectedRows } from "@/components/ui/task-data-table/actions/tasks-table-actions"
import {
    fetchTasksTableColumnDefs,
    filterableColumns,
    searchableColumns,
} from "@/components/ui/task-data-table/tasks-table-column-def"
import { getTasks } from "./actions/actions"

export function TasksTableShell() {
    const [isPending, startTransition] = React.useTransition()

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<Task, unknown>[]>(
        () => fetchTasksTableColumnDefs(isPending, startTransition),
        [isPending]
    )

    const { dataTable } = useDataTable({
        columns,
        filterableColumns,
        searchableColumns,
        fetchTableData: getTasks,
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
            deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
        />
    )
}
