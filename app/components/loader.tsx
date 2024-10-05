import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HospitalTableSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <Skeleton className="h-6 w-[150px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Skeleton className="h-9 w-[120px]" />
          <Skeleton className="h-9 w-[200px]" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}