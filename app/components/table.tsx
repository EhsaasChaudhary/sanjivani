import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";

// Sample JSON data
const data = [
    {
      id: 1,
      name: "Laser Lemonade Machine",
      status: "Draft",
      price: "$499.99",
      totalSales: 25,
      createdAt: "2023-07-12 10:42 AM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    },
    {
      id: 2,
      name: "Super Soda Dispenser",
      status: "Published",
      price: "$299.99",
      totalSales: 40,
      createdAt: "2023-06-10 11:20 AM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    },
    {
      id: 3,
      name: "High-Speed Blender",
      status: "Published",
      price: "$199.99",
      totalSales: 70,
      createdAt: "2023-05-05 09:15 AM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    },
    {
      id: 4,
      name: "Automatic Coffee Brewer",
      status: "Draft",
      price: "$249.99",
      totalSales: 35,
      createdAt: "2023-07-19 02:30 PM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    },
    {
      id: 5,
      name: "Ice Cream Maker",
      status: "Published",
      price: "$129.99",
      totalSales: 90,
      createdAt: "2023-03-22 10:00 AM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    },
    {
      id: 6,
      name: "Popcorn Popper",
      status: "Draft",
      price: "$89.99",
      totalSales: 50,
      createdAt: "2023-08-01 08:45 AM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    },
    {
      id: 7,
      name: "Hot Dog Roller",
      status: "Published",
      price: "$149.99",
      totalSales: 60,
      createdAt: "2023-04-14 12:10 PM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    },
    {
      id: 8,
      name: "Electric Pizza Oven",
      status: "Published",
      price: "$349.99",
      totalSales: 85,
      createdAt: "2023-06-18 01:30 PM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    },
    {
      id: 9,
      name: "Smoothie Maker",
      status: "Draft",
      price: "$159.99",
      totalSales: 45,
      createdAt: "2023-05-25 03:00 PM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    },
    {
      id: 10,
      name: "Frozen Yogurt Machine",
      status: "Published",
      price: "$189.99",
      totalSales: 100,
      createdAt: "2023-07-05 04:15 PM",
      imageUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    },
  ];
  
  

export default function Datatable() {
  return (
    <div className="flex h-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Manage your Resources</CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={item.name} // Use the item name as alt text for better accessibility
                          className="aspect-square rounded-md object-cover"
                          height={64}
                          src={item.imageUrl} // Use imageUrl from the dataset
                          width={64}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.totalSales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
