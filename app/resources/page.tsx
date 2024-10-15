"use client";

// import Image from "next/image";
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
import HospitalTableSkeleton from "../components/loader";
// import axios from "axios";

interface Medicine {
  Id: string;
  Name: string;
  Company: string;
  Usage: string;
  Description: string;
  Quantity: number;
}

export default function Datatable() {
  const [medicineData, setMedicineData] = useState<Medicine[]>([]);
  const [filteredData, setFilteredData] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemData, setSelectedItemData] = useState<Medicine | null>(
    null
  ); // New state for selected item data
  const [searchInput, setSearchInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const router = useRouter();

  useEffect(() => {
    const fetchMed = async () => {
      try {
        const response = await fetch(
          "https://64145d0d36020cecfda67863.mockapi.io/Medicines/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
            },
          }
        );

        if (response.ok) {
          const meddata: Medicine[] = await response.json();
          setMedicineData(meddata);
          setLoading(false);
        } else {
          const errorData = await response.json();
          setError(errorData);
          console.error("Failed to fetch hospitals:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMed();
  }, []);

  // Handle the search functionality
  useEffect(() => {
    const filtered = medicineData.filter((item) =>
      item.Name.toLowerCase().startsWith(searchInput.toUpperCase())
    );
    setFilteredData(filtered);
  }, [searchInput, medicineData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedItemId(id); // Set the item to be deleted
    setConfirmDialogOpen(true); // Open the confirmation dialog
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItemId) return;

    try {
      const response = await fetch(
        `https://64145d0d36020cecfda67863.mockapi.io/Medicines/${selectedItemId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
          },
        }
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

  // Modal close timeout for success dialog
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successDialogOpen) {
      timer = setTimeout(() => {
        setSuccessDialogOpen(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [successDialogOpen]);

  // New function to handle row click and open the modal with item data
  const handleRowClick = (item: Medicine) => {
    setSelectedItemData(item); // Set the selected item data
    setModalOpen(true); // Open the modal
  };

  if (loading) {
    return (
      <div>
        <HospitalTableSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex ml-2 mr-2 mb-2 mt-24 h-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          <Card className="h-full">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
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
                    {/* <TableHead>Image</TableHead> */}
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow
                      key={item.Id}
                      onClick={() => handleRowClick(item)}
                    >
                      <TableCell>{item.Name}</TableCell>
                      <TableCell>{item.Company}</TableCell>
                      <TableCell>{item.Usage}</TableCell>
                      <TableCell>{item.Description}</TableCell>
                      <TableCell>{item.Quantity}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()} // Prevent propagation
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {" "}
                            {/* Prevent propagation */}
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click event
                                router.push(`/resources/${item.Id}`);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click event
                                handleDeleteClick(item.Id);
                              }}
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
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

      {/* Modal for displaying selected item details */}
      {selectedItemData && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <div className="flex flex-col gap-3">
            <DialogContent className="rounded-lg">
              <DialogHeader>
                <DialogTitle>{selectedItemData.Name}</DialogTitle>
                <DialogDescription>
                  <p>
                    <strong>Quantity:</strong> {selectedItemData.Quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedItemData.Description}
                  </p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    router.push(`/resources/${selectedItemData.Id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(selectedItemData.Id)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        </Dialog>
      )}

      {/* Confirm Deletion Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              item.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="rounded-lg flex items-center justify-center">
          <CheckCircle className="text-green-600 w-6 h-6 mr-2" />
          <span>Item deleted successfully</span>
        </DialogContent>
      </Dialog>
    </div>
  );
}
