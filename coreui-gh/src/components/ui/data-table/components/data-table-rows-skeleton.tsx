import { Skeleton } from "@/components/ui/skeleton"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

interface DataTableSkeletonProps {
    columnCount: number
    rowCount?: number
    searchableColumnCount?: number
    filterableColumnCount?: number
}

export function DataTableRowsSkeleton({
    columnCount,
    rowCount = 10,
}: DataTableSkeletonProps) {
    return (
        Array.from({ length: rowCount }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                    <TableCell key={i}>
                        <Skeleton className="h-6 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))
    )
}
