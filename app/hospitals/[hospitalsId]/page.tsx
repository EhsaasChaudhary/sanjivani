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
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const HospitalSchema = z.object({
  Name: z.string().min(1, "Name is required."),
  Branch: z.string().min(1, "Branch is required."),
  Speciality: z.string().min(1, "Speciality is required."),
  Description: z.string().min(1, "Description is required."),
  Capacity: z.string().min(1, "Capacity is required."),
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
      Branch: "",
      Speciality: "",
      Description: "",
      Capacity: "",
    },
  });

  useEffect(() => {
    if (hospitalsId !== "new") {
      const fetchHospitalData = async () => {
        console.log(hospitalsId);
        try {
          const response = await fetch(
            `https://670e5a983e71518616542879.mockapi.io/Hospitals/${hospitalsId}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
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
          "Content-Type": "application/json",
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3Mjc4NzU5NDR9.Q-YcKxskj_04NplxNO7OYoHORWJHozPI_JCsBrn0pLg`,
        },
        body: JSON.stringify(data),
      };

      const url =
        hospitalsId === "new"
          ? `https://670e5a983e71518616542879.mockapi.io/Hospitals/`
          : `https://670e5a983e71518616542879.mockapi.io/Hospitals/${hospitalsId}`;

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
        <div className="m-6">
          <CardTitle>Hospital</CardTitle>
          <CardDescription>Fill in Hospital info</CardDescription>
        </div>
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
              name="Branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Speciality of the Hospital"
                      {...field}
                    />
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
                    <Textarea placeholder="Hospital Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Capacity (Beds)"
                      {...field}
                    />
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
