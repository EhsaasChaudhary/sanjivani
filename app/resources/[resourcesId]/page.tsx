"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";


// Schema for validating medicine form data
const MedicineSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  quantity: z.coerce.number().gte(1, "Quantity must be greater than 0."),
  price_per_unit: z.coerce.number().gte(1, "Quantity must be greater than 0."),
  company: z.string().min(1, "Company is required."),
});

const MedicineForm = ({ params }: { params: { medicine_id: string } }) => {
  const router = useRouter();
  const { medicine_id } = params;
  const [loading, setLoading] = useState<boolean>(medicine_id !== "new");
  const [error, setError] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  // Define the JWT token
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NjIyMjR9.cZgrQRY9LI5dsqQcK9uineahbGYbUoN-o-urZp561Ec"; // Replace with your actual JWT token

  const form = useForm<z.infer<typeof MedicineSchema>>({
    resolver: zodResolver(MedicineSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1, // Default quantity set to 1
      price_per_unit: 1, // Default quantity set to 1
    },
  });

  useEffect(() => {
    if (medicine_id !== "new") {
      const fetchMedicineData = async () => {
        try {
          const response = await fetch(
            `http://13.126.120.181:8000/medicines/${medicine_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for medicine with ID: ${medicine_id}`
            );
          }
          const data = await response.json();
          form.reset(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchMedicineData();
    } else {
      setLoading(false);
    }
  }, [medicine_id, form]);

  const handleSubmit = async (data: z.infer<typeof MedicineSchema>) => {
    try {
      const requestOptions = {
        method: medicine_id === "new" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };

      const url =
        medicine_id === "new"
          ? `http://13.126.120.181:8000/medicines`
          : `http://13.126.120.181:8000/medicines/${medicine_id}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(
          medicine_id === "new"
            ? "Failed to create new medicine"
            : "Failed to update medicine"
        );
      }

      setSuccessDialogOpen(true);
      setTimeout(() => {
        setSuccessDialogOpen(false);
        router.push("/resources");
      }, 1500);
    } catch (error) {
      console.error("Error submitting medicine:", error);
      // toast({ title: "Submission Error", description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Card className="h-screen ml-3 mr-3 mb-3 mt-24">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="m-4 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Medicine Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_per_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price per unit</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {medicine_id === "new" ? "Create" : "Update"} Medicine
            </Button>
          </form>
        </Form>
      </Card>

      {/* Success dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {medicine_id === "new"
                ? "Creation Successful"
                : "Update Successful"}
            </DialogTitle>
            <DialogDescription>
              The item has been successfully{" "}
              {medicine_id === "new" ? "added" : "updated"}.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicineForm;
