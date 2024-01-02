import { Label, Priority, Status, type Task } from "@/components/ui/basic-data-table/table-data-schema-example"
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
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/components/data-table-column-header"

export function fetchTasksTableColumnDefs<TData>(): ColumnDef<TData, unknown>[] {
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
  ]
}

export const filterableColumns: DataTableFilterableColumn<Task>[] = [
  {
    id: "status",
    title: "Status",
    options: Object.values(Status).map((status) => ({
      label: status,
      value: status,
    })),
  },
  {
    id: "priority",
    title: "Priority",
    options: Object.values(Priority).map((priority) => ({
      label: priority,
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
