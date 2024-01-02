import { type User } from "@/components/ui/user-data-table/table-data-schema"
import type {
  DataTableSearchableColumn,
} from "@/components/ui/data-table/types"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table/components/data-table-column-header"

export function fetchUsersTableColumnDefs<TData>(): ColumnDef<TData, unknown>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User Name" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("userName")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User Description" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        )
      },
    },
    {
      accessorKey: "collectedRepos",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Collected Repos" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("collectedRepos")}
          </span>
        )
      },
    },
  ]
}

export const searchableColumns: DataTableSearchableColumn<User>[] = [
  {
    id: "description",
    title: "descriptions",
  },
]
