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

const HospitalSchema = z.object({
  Name: z.string().min(1, "Name is required."),
  Company: z.string().min(1, "Company is required."),
  Usage: z.string().min(1, "Usage is required."),
  Description: z.string().min(1, "Description is required."),
  Quantity: z.coerce.number().gte(1, "Quantity must be greater than 0."),
  imageUrl: z.string().optional(),
});

const HospitalForm = ({ params }: { params: { hospitalsId: string } }) => {
  const router = useRouter();
  const { hospitalsId } = params;
  const [loading, setLoading] = useState<boolean>(hospitalsId !== "new");
  const [error, setError] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof HospitalSchema>>({
    resolver: zodResolver(HospitalSchema),
    defaultValues: {
      Name: "",
      Company: "",
      Usage: "",
      Description: "",
      Quantity: 1, // Default quantity set to 1
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (hospitalsId !== "new") {
      const fetchHospitalData = async () => {
        try {
          const response = await fetch(
            `https://64145d0d36020cecfda67863.mockapi.io/Hospitals/${hospitalsId}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for Hospital with ID: ${hospitalsId}`
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

      fetchHospitalData();
    } else {
      setLoading(false);
    }
  }, [hospitalsId, form]);

  const handleSubmit = async (data: z.infer<typeof HospitalSchema>) => {
    try {
      const requestOptions = {
        method: hospitalsId === "new" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const url =
        hospitalsId === "new"
          ? `https://64145d0d36020cecfda67863.mockapi.io/Hospitals`
          : `https://64145d0d36020cecfda67863.mockapi.io/Hospitals/${hospitalsId}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(
          hospitalsId === "new"
            ? "Failed to create new Hospital"
            : "Failed to update Hospital"
        );
      }

      setSuccessDialogOpen(true);

      setTimeout(() => {
        setSuccessDialogOpen(false);
        router.push("/hospitals");
      }, 1500);
    } catch (error) {
      console.error("Error submitting Hospital:", error);
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
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hospital Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Usage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage</FormLabel>
                  <FormControl>
                    <Input placeholder="Usage Instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Description"
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
              name="Quantity"
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
              {hospitalsId === "new" ? "Create" : "Update"} Hospital
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
              {hospitalsId === "new"
                ? "Creation Successful"
                : "Update Successful"}
            </DialogTitle>
            <DialogDescription>
              The item has been successfully{" "}
              {hospitalsId === "new" ? "added" : "updated"}.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HospitalForm;
