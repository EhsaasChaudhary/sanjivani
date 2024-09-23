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
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  },
  {
    id: 2,
    name: "Super Soda Dispenser",
    status: "Published",
    price: "$299.99",
    totalSales: 40,
    createdAt: "2023-06-10 11:20 AM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
  },
  {
    id: 3,
    name: "High-Speed Blender",
    status: "Published",
    price: "$199.99",
    totalSales: 70,
    createdAt: "2023-05-05 09:15 AM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
  },
  {
    id: 4,
    name: "Automatic Coffee Brewer",
    status: "Draft",
    price: "$249.99",
    totalSales: 35,
    createdAt: "2023-07-19 02:30 PM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
  },
  {
    id: 5,
    name: "Ice Cream Maker",
    status: "Published",
    price: "$129.99",
    totalSales: 90,
    createdAt: "2023-03-22 10:00 AM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
  },
  {
    id: 6,
    name: "Popcorn Popper",
    status: "Draft",
    price: "$89.99",
    totalSales: 50,
    createdAt: "2023-08-01 08:45 AM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
  },
  {
    id: 7,
    name: "Hot Dog Roller",
    status: "Published",
    price: "$149.99",
    totalSales: 60,
    createdAt: "2023-04-14 12:10 PM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
  },
  {
    id: 8,
    name: "Electric Pizza Oven",
    status: "Published",
    price: "$349.99",
    totalSales: 85,
    createdAt: "2023-06-18 01:30 PM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
  },
  {
    id: 9,
    name: "Smoothie Maker",
    status: "Draft",
    price: "$159.99",
    totalSales: 45,
    createdAt: "2023-05-25 03:00 PM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
  },
  {
    id: 10,
    name: "Frozen Yogurt Machine",
    status: "Published",
    price: "$189.99",
    totalSales: 100,
    createdAt: "2023-07-05 04:15 PM",
    imageUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  },
];

export default function Datatable() {
  return (
    <div className="flex ml-2 mr-2 mb-2 h-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          <Card className="h-full">
            <CardHeader className="flex flex-row justify-between items-center">
              {/* Title and Description */}
              <div>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Manage your Resources</CardDescription>
              </div>

              {/* Searchbar and Dropdown */}
              <div className="relative flex items-center gap-2">
                {/* Dropdown button connected to the search bar */}
                <div className="relative">
                  {/* Dropdown toggle button */}
                  <button
                    className="peer btn btn-outline btn-sm flex items-center justify-between rounded-l-md border border-input bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-foreground"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                    {/* Dropdown icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.415 0l3 3a1 1 0 010 1.415l-3 3a1 1 0 01-1.415-1.415L7.586 12 5.293 9.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div className="invisible absolute left-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 peer-focus:visible peer-focus:opacity-100 focus-within:visible peer-focus-within:block">
                    <a
                      className="dropdown-item block px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40"
                      href="#"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item block px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40"
                      href="#"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item block px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40"
                      href="#"
                    >
                      Something else here
                    </a>
                    <div
                      role="separator"
                      className="dropdown-divider border-t my-1"
                    ></div>
                    <a
                      className="dropdown-item block px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40"
                      href="#"
                    >
                      Separated link
                    </a>
                  </div>
                </div>

                {/* Search input connected to dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    className="w-50 rounded-r-md border border-input bg-background pl-3 pr-10 py-2 text-sm shadow-sm focus:border-accent focus:ring-2 focus:ring-accent"
                    placeholder="Search..."
                    aria-label="Search input with dropdown"
                  />
                  {/* Search icon inside input */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35"
                    />
                  </svg>
                </div>
              </div>
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
