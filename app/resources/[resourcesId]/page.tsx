
'use client'
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Medicine {
  resourcesId: number;
  Name: string;
  Company: string;
  Usage: string;
  Description: string;
  Quantity: number;
  imageUrl: string;
}

// Simulating an API call to fetch medicine data by ID
async function getMedicineData(id: number): Promise<Medicine | undefined> {
    const medicineData: Medicine[] = [
        {
          resourcesId: 1,
          Name: "Paracetamol",
          Company: "HealthPlus Pharmaceuticals",
          Usage: "Pain Relief, Fever Reduction",
          Description: "Used to treat mild to moderate pain and reduce fever.",
          Quantity: 100,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
        },
        {
          resourcesId: 2,
          Name: "Amoxicillin",
          Company: "BioCare Labs",
          Usage: "Bacterial Infections",
          Description: "An antibiotic used to treat various bacterial infections.",
          Quantity: 50,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
        },
        {
          resourcesId: 3,
          Name: "Aspirin",
          Company: "GlobalMeds Ltd",
          Usage: "Pain Relief, Anti-Inflammatory",
          Description: "Reduces pain, inflammation, and helps prevent blood clots.",
          Quantity: 200,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
        },
        {
          resourcesId: 4,
          Name: "Ibuprofen",
          Company: "Medico Health",
          Usage: "Pain Relief, Inflammation Reduction",
          Description: "Used to reduce fever and treat pain or inflammation.",
          Quantity: 150,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
        },
        {
          resourcesId: 5,
          Name: "Cetirizine",
          Company: "AllergyCare Pharma",
          Usage: "Allergy Relief",
          Description:
            "Antihistamine for treating allergy symptoms like itching and runny nose.",
          Quantity: 120,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
        },
        {
          resourcesId: 6,
          Name: "Omeprazole",
          Company: "StomachGuard Labs",
          Usage: "Acid Reflux, Ulcers",
          Description:
            "Treats heartburn, stomach ulcers, and acid reflux by reducing stomach acid.",
          Quantity: 90,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
        },
        {
          resourcesId: 7,
          Name: "Metformin",
          Company: "GlucoseMeds Inc.",
          Usage: "Diabetes Management",
          Description:
            "Used to control high blood sugar in people with type 2 diabetes.",
          Quantity: 300,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
        },
        {
          resourcesId: 8,
          Name: "Atorvastatin",
          Company: "HeartCare Solutions",
          Usage: "Cholesterol Management",
          Description:
            "Helps lower bad cholesterol and fats, reducing the risk of heart disease.",
          Quantity: 80,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
        },
        {
          resourcesId: 9,
          Name: "Salbutamol",
          Company: "Respira Pharmaceuticals",
          Usage: "Asthma, Respiratory Issues",
          Description:
            "A bronchodilator that helps open up the airways in lungs, used for asthma.",
          Quantity: 60,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
        },
        {
          resourcesId: 10,
          Name: "Lisinopril",
          Company: "CardioCare Pharma",
          Usage: "Blood Pressure Control",
          Description: "Used to treat high blood pressure and heart failure.",
          Quantity: 130,
          imageUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
        },
  ];
  return medicineData.find((medicine) => medicine.resourcesId === id);
}

export default function EditMedicineForm({ params }: { params: { id: number } }) {
  const { id } = params; // Get the dynamic id from the URL
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicineData(id); // Convert id to number
      // Set medicine to data if it's found, otherwise set to null
      setMedicine(data || null);
    };

    fetchData();
  }, [id]);

  if (!medicine) {
    return <div>Loading...</div>; // Show a loading state or a message if no data found
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <form className="w-full max-w-md space-y-6 bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Medicine</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={medicine.Name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" defaultValue={medicine.Company} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage">Usage</Label>
          <Select defaultValue={medicine.Usage}>
            <SelectTrigger id="usage">
              <SelectValue placeholder="Select usage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Once a day">Once a day</SelectItem>
              <SelectItem value="After lunch">After lunch</SelectItem>
              <SelectItem value="Before dinner">Before dinner</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your use case..."
            className="min-h-[100px]"
            defaultValue={medicine.Description}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            step="1"
            defaultValue={medicine.Quantity} // Fix the casing here
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
