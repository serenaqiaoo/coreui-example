import * as React from "react"
import { type Task } from "@/components/ui/task-data-table/task-data-schema"
import { type Table } from "@tanstack/react-table"
import { toast } from "sonner"

import { catchError } from "@/lib/catch-error"
import { mockAsyncTimeout } from "@/helpers"

export function deleteSelectedRows(
    table: Table<Task>,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
    event?.preventDefault()
    const selectedRows = table.getFilteredSelectedRowModel().rows as {
        original: Task
    }[]
    toast.promise(
        Promise.all(
            selectedRows.map(async (row) =>
                // deleteTask({
                //   id: row.original.id,
                // })
                mockAsyncTimeout(2000)
            )
        ),
        {
            loading: "Deleting...",
            success: () => {
                return "Tasks deleted successfully."
            },
            error: (err: unknown) => {
                return catchError(err)
            },
        }
    )
}
