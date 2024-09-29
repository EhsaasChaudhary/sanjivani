"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreHorizontal, AlertTriangle, CheckCircle } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

interface Medicine {
  Id: string;
  Name: string;
  Company: string;
  Usage: string;
  Description: string;
  Quantity: number;
  imageUrl: string;
}

export default function Datatable() {
  const [medicineData, setMedicineData] = useState<Medicine[]>([]);
  const [filteredData, setFilteredData] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
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
        setFilteredData(data); // Initialize filtered data
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the search functionality
  useEffect(() => {
    const filtered = medicineData.filter((item) =>
      item.Name.toUpperCase().startsWith(searchInput.toUpperCase())
    );
    setFilteredData(filtered);
  }, [searchInput, medicineData]);
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedItemId(id); // Set the item to be deleted
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItemId) return;

    try {
      const response = await fetch(
        `https://64145d0d36020cecfda67863.mockapi.io/Medicines/${selectedItemId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }

      // Remove the deleted item from the state
      setMedicineData((prevData) =>
        prevData.filter((item) => item.Id !== selectedItemId)
      );
      setConfirmDialogOpen(false); // Close the confirmation dialog
      setSuccessDialogOpen(true); // Open the success dialog
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successDialogOpen) {
      timer = setTimeout(() => {
        setSuccessDialogOpen(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [successDialogOpen]);

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
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              {/* Title and Description */}
              <div>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Manage your Resources</CardDescription>
              </div>

              {/* Searchbar and Add New Item Button */}
              <div className="relative flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  className="btn btn-outline btn-sm flex items-center justify-between rounded-l-md border border-input bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-foreground"
                  type="button"
                  onClick={() => router.push(`/resources/new`)}
                >
                  Add New Item
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Search input */}
                <div className="relative">
                  <input
                    type="text"
                    className="w-50 rounded-r-md border border-input bg-background pl-3 pr-10 py-2 text-sm shadow-sm focus:border-accent focus:ring-2 focus:ring-accent"
                    placeholder="Search by Name..."
                    aria-label="Search input"
                    value={searchInput}
                    onChange={handleSearchChange}
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
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.Id}>
                      <TableCell>
                        <Image
                          alt={item.Name}
                          className="aspect-square rounded-md"
                          height={64}
                          src={item.imageUrl}
                          width={64}
                        />
                      </TableCell>
                      <TableCell>{item.Name}</TableCell>
                      <TableCell>{item.Company}</TableCell>
                      <TableCell>{item.Usage}</TableCell>
                      <TableCell>{item.Quantity}</TableCell>
                      <TableCell>{item.Description}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/resources/${item.Id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(item.Id)}
                            >
                              Delete
                            </DropdownMenuItem>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Deletion Successful
            </DialogTitle>
            <DialogDescription>
              The item has been successfully deleted.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
