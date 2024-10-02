'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Replace with your actual component library imports
import { MoreHorizontal, Table } from "lucide-react"; // Adjust this import based on your icon library
// Assuming you're using Next.js for image optimization
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Adjusted Medicine interface to match API response
interface Medicine {
  id: number; // Changed to number to match API response
  name: string; // Changed to lowercase to match API response
  description: string;
  quantity: number;
  price_per_unit: number; // Added to match API schema
  hospital_id: number; // Added to match API schema
}

// Update API_URL if needed
const API_URL = "http://13.126.120.181:8000/medicines"; // Keep this as is

export default function Datatable() {
  const [medicineData, setMedicineData] = useState<Medicine[]>([]);
  const [filteredData, setFilteredData] = useState<Medicine[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Change to number
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  // Fetching the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`, // Adjust as necessary
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Medicine[] = await response.json(); // Specify the type here
        setMedicineData(data);
        setFilteredData(data);
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
      item.name.toUpperCase().startsWith(searchInput.toUpperCase())
    );
    setFilteredData(filtered);
  }, [searchInput, medicineData]);

  const handleDeleteClick = (id: number) => {
    // Change id type to number
    setSelectedItemId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItemId === null) return; // Check if id is null

    try {
      const response = await fetch(`${API_URL}/${selectedItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`, // Adjust as necessary
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }

      // Remove the deleted item from the state
      setMedicineData(
        (prevData) => prevData.filter((item) => item.id !== selectedItemId) // Change to id
      );
      setConfirmDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="flex ml-2 mr-2 mb-2 mt-24 h-full">
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
                <TableHead>Name</TableHead>
                <TableHead>ppu</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price_per_unit}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteClick(item.id)} // Change to id
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Item deleted successfully.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSuccessDialogOpen(false)}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
