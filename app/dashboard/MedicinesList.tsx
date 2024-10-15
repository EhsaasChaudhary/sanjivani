"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// Define the Medicine interface
interface Medicine {
  Id: number;
  Name: string;
}

const MedicinesList = ({
  setCount,
}: {
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.Name.toLowerCase().startsWith(medicineSearch.toLowerCase())
  );

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(
          "https://64145d0d36020cecfda67863.mockapi.io/Medicines/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              // Authorization:
              //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzkwNjZ9.BgN-Rri0GmJ-j7Te9W7CKNsn56KLCO80aocuASHym30",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Medicine[] = await response.json();
        setMedicines(data);
        setCount(data.length);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [setCount]); // Add setCount to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Search medicines..."
            value={medicineSearch}
            onChange={(e) => setMedicineSearch(e.target.value)}
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search medicines</span>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Names</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines.map((medicine) => (
              <TableRow key={medicine.Id}>
                <TableCell>{medicine.Name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MedicinesList;
