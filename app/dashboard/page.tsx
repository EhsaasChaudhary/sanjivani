"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Building2 } from "lucide-react";
import MedicinesList from "./MedicinesList";
import HospitalsList from "./HospitalsList";

export default function Dashboard() {
  const [medicineCount, setMedicineCount] = useState<number>(0);
  const [hospitalCount, setHospitalCount] = useState<number>(0);

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
              <div className="text-2xl font-bold">{medicineCount}</div>
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
              <div className="text-2xl font-bold">{hospitalCount}</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-6">
        <MedicinesList setCount={setMedicineCount} />
        <HospitalsList setCount={setHospitalCount} />{" "}
        {/* Use the new HospitalsList component */}
      </div>
    </div>
  );
}
