import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function Component() {
  return (
    <div className="h-screen w-screen p-4 bg-background">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-2xl font-bold">Hospitals</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="flex-grow overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead className="text-right">Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-5 w-[230px]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-[150px]" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-[60px] ml-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}