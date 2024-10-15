"use client";

import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
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
import { Search } from "lucide-react";
import Loadertab from "../components/loadertab";

// Define the Hospital interface
interface Hospital {
  Id: number;
  Name: string;
}

// interface HospitalResponse {
//   data: Hospital[]; // Define this based on how your API responds
// }

export default function HospitalsList({
  setCount,
}: {
  setCount: Dispatch<SetStateAction<number>>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalSearch, setHospitalSearch] = useState<string>("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "https://670e5a983e71518616542879.mockapi.io/Hospitals/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
            },
          }
        );

        if (response.ok) {
          const data: Hospital[] = await response.json();
          setHospitals(data);
          setCount(data.length);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch hospitals:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHospitals();
  }, [setCount]);

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.Name.toLowerCase().startsWith(hospitalSearch.toLowerCase())
  );

  if (isLoading) {
    return <div className=""><Loadertab/></div>;
  }

  return (
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
              <TableRow key={hospital.Id}>
                <TableCell>{hospital.Name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
