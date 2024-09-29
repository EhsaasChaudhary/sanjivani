'use client';

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface Medicine {
  Id: string; // Ensure this matches the API response
  Name: string;
  Company: string;
  Usage: string;
  Description: string;
  Quantity: number;
  imageUrl: string;
}

const EditMedicineForm = ({ params }: { params: { resourcesId: string } }) => {
  const router = useRouter();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicineData = async () => {
      const { resourcesId } = params;
      try {
        const response = await fetch(`https://64145d0d36020cecfda67863.mockapi.io/Medicines/${resourcesId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for medicine with ID: ${resourcesId}`);
        }
        const data = await response.json();
        setMedicine(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, [params]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!medicine) return;

    try {
      const response = await fetch(`https://64145d0d36020cecfda67863.mockapi.io/Medicines/${medicine.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicine),
      });

      if (!response.ok) {
        throw new Error("Failed to update medicine");
      }
      
      router.push('/resources'); // Navigate back to the resources list after editing
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={medicine?.Name || ''}
          onChange={(e) => setMedicine({ ...medicine!, Name: e.target.value } as Medicine)}
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={medicine?.Company || ''}
          onChange={(e) => setMedicine({ ...medicine!, Company: e.target.value } as Medicine)}
        />
      </div>
      <div>
        <Label htmlFor="usage">Usage</Label>
        <Input
          id="usage"
          value={medicine?.Usage || ''}
          onChange={(e) => setMedicine({ ...medicine!, Usage: e.target.value } as Medicine)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={medicine?.Description || ''}
          onChange={(e) => setMedicine({ ...medicine!, Description: e.target.value } as Medicine)}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          id="quantity"
          value={medicine?.Quantity || ''}
          onChange={(e) => setMedicine({ ...medicine!, Quantity: parseInt(e.target.value) })}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default EditMedicineForm;
