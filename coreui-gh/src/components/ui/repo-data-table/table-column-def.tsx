import { type Repo } from "@/components/ui/repo-data-table/table-data-schema"
import type {
  DataTableSearchableColumn,
} from "@/components/ui/data-table/types"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table/components/data-table-column-header"

export function fetchReposTableColumnDefs<TData>(): ColumnDef<TData, unknown>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Repo ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "repoName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Repo Name" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("repoName")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Repo Description" />
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
      accessorKey: "commonStargazers",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Common Stargazers" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("commonStargazers")}
          </span>
        )
      },
    },
  ]
}

export const searchableColumns: DataTableSearchableColumn<Repo>[] = [
  {
    id: "description",
    title: "descriptions",
  },
]
