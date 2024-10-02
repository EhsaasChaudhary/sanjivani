"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pill, Building2, Search } from "lucide-react";

export default function Dashboard() {
  // State for storing medicine and hospital data
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // States for search input
  const [medicineSearch, setMedicineSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");

  // States for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data for medicines and hospitals from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NTgxNDN9.vGEULRvuDtnr4in0CTZmIIZDrgk5mSyGWnHjxZk7W28"; // JWT token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        // Fetch medicines
        const medicineResponse = await fetch(
          "http://13.126.120.181:8000/medicines",
          {
            headers,
          }
        );

        // Fetch hospitals
        const hospitalResponse = await fetch(
          "http://13.126.120.181:8000/hospitals",
          {
            headers,
          }
        );

        if (!medicineResponse.ok || !hospitalResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const medicineData = await medicineResponse.json();
        const hospitalData = await hospitalResponse.json();

        setMedicines(medicineData);
        setHospitals(hospitalData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data for search functionality
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().startsWith(medicineSearch.toLowerCase())
  );

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().startsWith(hospitalSearch.toLowerCase())
  );

  // Show loading or error messages if necessary
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-24 p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/medicines">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Medicines
              </CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{medicines.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/hospitals">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hospitals
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitals.length}</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-6">
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
                  <TableHead>Name</TableHead>
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

        <Card>
          <CardHeader>
            <CardTitle>Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="Search hospitals..."
                value={hospitalSearch}
                onChange={(e) => setHospitalSearch(e.target.value)}
              />
              <Button size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search hospitals</span>
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHospitals.map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell>{hospital.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Define interfaces for the data types
interface Medicine {
  id: number;
  name: string;
}

interface Hospital {
  id: number;
  name: string;
}
