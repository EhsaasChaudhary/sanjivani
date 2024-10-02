"use client";

import axios from "axios";

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

// Define interfaces for Medicine and Hospital
interface Medicine {
  id: number;
  name: string;
}

interface Hospital {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const [hospitalSearch, setHospitalSearch] = useState<string>("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "https://healthcareinfra.soham901.me/hospitals/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
            },
          }
        );

        if (response.ok) {
          const data: Hospital[] = await response.json();
          setHospitals(data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch hospitals:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchMed = async () => {
      return await axios.get("https://healthcareinfra.soham901.me/medicines/", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
        },
      });
    };

    fetchHospitals().then(() => {
      fetchMed().then((data) => {
        setMedicines(data.data);
        setIsLoading(false);
      });
    });
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().startsWith(medicineSearch.toLowerCase())
  );

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().startsWith(hospitalSearch.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading......
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-24 p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/resources">
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
