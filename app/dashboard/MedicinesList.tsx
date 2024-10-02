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

const MedicinesList = ({
  setCount,
}: {
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().startsWith(medicineSearch.toLowerCase())
  );

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(
          "https://healthcareinfra.soham901.me/medicines/?skip=0&limit=100",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzkwNjZ9.BgN-Rri0GmJ-j7Te9W7CKNsn56KLCO80aocuASHym30",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMedicines(data);
        setCount(data.length);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

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
              <TableRow key={medicine.id}>
                <TableCell>{medicine.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MedicinesList;
