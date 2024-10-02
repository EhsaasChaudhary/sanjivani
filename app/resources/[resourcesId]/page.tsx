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

const MedicineSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  quantity: z.coerce.number().gte(1, "Quantity must be greater than 0."),
  price_per_unit: z.coerce.number().gte(1, "Quantity must be greater than 0."),
});

const MedicineForm = ({ params }: { params: { resourcesId: string } }) => {
  const router = useRouter();
  const { resourcesId } = params;
  const [loading, setLoading] = useState<boolean>(resourcesId !== "new");
  const [error, setError] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof MedicineSchema>>({
    resolver: zodResolver(MedicineSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1, // Default quantity set to 1
      price_per_unit: 0,
    },
  });

  useEffect(() => {
    if (resourcesId !== "new") {
      const fetchMedicineData = async () => {
        try {
          const response = await fetch(
            `https://healthcareinfra.soham901.me/medicines/${resourcesId}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for medicine with ID: ${resourcesId}`
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
  }, [resourcesId, form]);

  const handleSubmit = async (data: z.infer<typeof MedicineSchema>) => {
    try {
      const requestOptions = {
        method: resourcesId === "new" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const url =
        resourcesId === "new"
          ? `https://healthcareinfra.soham901.me/medicines/`
          : `https://healthcareinfra.soham901.me/medicines/${resourcesId}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(
          resourcesId === "new"
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
              name="price_per_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="enter prices" {...field} />
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
            <Button type="submit">
              {resourcesId === "new" ? "Create" : "Update"} Medicine
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
              {resourcesId === "new"
                ? "Creation Successful"
                : "Update Successful"}
            </DialogTitle>
            <DialogDescription>
              The item has been successfully{" "}
              {resourcesId === "new" ? "added" : "updated"}.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicineForm;
