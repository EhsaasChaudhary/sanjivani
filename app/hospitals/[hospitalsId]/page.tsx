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
  name: z.string().min(1, "Name is required."),
  address: z.string().min(1, "Address is required."),
  latitude: z.coerce.number().gte(1, "latitude must be greater than 0."),
  longitude: z.coerce.number().gte(1, "Quantity must be greater than 0."),
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
      name: "",
      address: "",
      latitude: 0, // Default quantity set to 1
      longitude: 0,
    },
  });

  useEffect(() => {
    if (hospitalsId !== "new") {
      const fetchHospitalData = async () => {
        console.log(hospitalsId);
        try {
          const response = await fetch(
            `https://healthcareinfra.soham901.me/hospitals/${hospitalsId}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
              },
            }
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
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
        },
        body: JSON.stringify(data),
      };

      const url =
        hospitalsId === "new"
          ? `https://healthcareinfra.soham901.me/hospitals/`
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
              name="name"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Longitude" {...field} />
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
