import { Label, Priority, Status, type Task } from "@/components/ui/task-data-table/task-data-schema"
import type {
    DataTableFilterableColumn,
    DataTableSearchableColumn,
} from "@/components/ui/data-table/types"
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    DotsHorizontalIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { catchError } from "@/lib/catch-error"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/ui/data-table/components/data-table-column-header"
import { mockAsyncTimeout } from "@/helpers"

export function fetchTasksTableColumnDefs(
    isPending: boolean,
    startTransition: React.TransitionStartFunction
): ColumnDef<Task, unknown>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value)
                    }}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "code",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Task" />
            ),
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
            cell: ({ row }) => {
                const label = row.getValue("label") as Label

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <span className="max-w-[500px] truncate font-medium">
                            {row.getValue("title")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as Status

                if (!status) return null

                return (
                    <div className="flex w-[100px] items-center">
                        {status === "canceled" ? (
                            <CrossCircledIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : status === "done" ? (
                            <CheckCircledIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : status === "in-progress" ? (
                            <StopwatchIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : status === "todo" ? (
                            <QuestionMarkCircledIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : (
                            <CircleIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        )}
                        <span className="capitalize">{status}</span>
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value instanceof Array && value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "priority",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Priority" />
            ),
            cell: ({ row }) => {
                const priority = row.getValue("priority") as Priority

                if (!priority) {
                    return null
                }

                return (
                    <div className="flex items-center">
                        {priority === "low" ? (
                            <ArrowDownIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : priority === "medium" ? (
                            <ArrowRightIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : priority === "high" ? (
                            <ArrowUpIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        ) : (
                            <CircleIcon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        )}
                        <span className="capitalize">{priority}</span>
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value instanceof Array && value.includes(row.getValue(id))
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-label="Open menu"
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                            <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={row.original.label}
                                    onValueChange={(value) => {
                                        startTransition(async () => {
                                            // should call useDataTable to set labelValue
                                            // useDataTable watches for label value change
                                            // and then call BE api to change value
                                            // then rerender the table with old states
                                            // but here, I just simplify the logic to call a dummy endpoint
                                            // await updateTaskLabel({
                                            //     id: row.original.id,
                                            //     label: value as Task["label"],
                                            // })
                                            await mockAsyncTimeout(2000);
                                            console.log(`Finished update task label for ${row.original.id} from ${row.original.label} to ${value}`)
                                        })
                                    }}
                                >
                                    {Object.values(Label).map((label) => (
                                        <DropdownMenuRadioItem
                                            key={label}
                                            value={label}
                                            disabled={isPending}
                                            className="capitalize"
                                        >
                                            {label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                startTransition(() => {
                                    row.toggleSelected(false)

                                    toast.promise(
                                        // deleteTask({
                                        //     id: row.original.id,
                                        // }),
                                        mockAsyncTimeout(2000),
                                        {
                                            loading: "Deleting...",
                                            success: () => `Task ${row.original.id} deleted successfully.`,
                                            error: (err: unknown) => catchError(err),
                                        }
                                    )
                                })
                            }}
                        >
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]
}

export const filterableColumns: DataTableFilterableColumn<Task>[] = [
    {
        id: "status",
        title: "Status",
        options: Object.values(Status).map((status) => ({
            label: status[0]?.toUpperCase() + status.slice(1),
            value: status,
        })),
    },
    {
        id: "priority",
        title: "Priority",
        options: Object.values(Priority).map((priority) => ({
            label: priority[0]?.toUpperCase() + priority.slice(1),
            value: priority,
        })),
    },
]

export const searchableColumns: DataTableSearchableColumn<Task>[] = [
    {
        id: "title",
        title: "titles",
    },
]
