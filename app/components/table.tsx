'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
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
import React, { useEffect, useState } from "react";

// Interface for Medicine Data
interface Medicine {
  Id: string; // Update to match the API response
  Name: string;
  Company: string;
  Usage: string;
  Description: string;
  Quantity: number;
  imageUrl: string;
}

export default function Datatable() {
  const [medicineData, setMedicineData] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64145d0d36020cecfda67863.mockapi.io/Medicines"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMedicineData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id: string): void => {
    console.log("Navigating to edit page with ID:", id); // Log the ID for debugging
    router.push(`/resources/${id}`); // Navigate to dynamic route with Id
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                  <button
                    className="peer btn btn-outline btn-sm flex items-center justify-between rounded-l-md border border-input bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-foreground"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
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
                    <TableHead>Company</TableHead>
                    <TableHead className="hidden md:table-cell">Usage</TableHead>
                    <TableHead className="hidden md:table-cell">Quantity</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {medicineData.map((item) => (
                    <TableRow key={item.Id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={item.Name}
                          className="aspect-square rounded-md object-cover"
                          height={64}
                          src={item.imageUrl}
                          width={64}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.Name}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.Company}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.Usage}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.Quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.Description}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditClick(item.Id)}>
                              Edit
                            </DropdownMenuItem>
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
