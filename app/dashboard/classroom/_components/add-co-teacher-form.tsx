"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import api from "@/lib/axios"; // Assuming you have your Axios instance here
import { useTeacherByUserId } from "@/hooks/use-teacher";

interface AddCoTeacherFormData {
  email: string;
  class: string;
}

export function AddCoTeacherForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { refetch } = useTeacherByUserId(session?.user.id || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCoTeacherFormData>({
    defaultValues: {
      email: "",
      class: "all",
    },
  });

  const onSubmit = async (formData: AddCoTeacherFormData) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "User session not found. Please login again.",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.post(`/teacher/add`, {
        userId: session.user.id,
        ...formData,
      });

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${formData.email} for class ${formData.class}`,
      });

      setDialogOpen(false);
      refetch();
      reset(); // Clear form after success
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send invitation.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Co-Teacher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Co-Teacher</DialogTitle>
          <DialogDescription>
            Invite a teacher by entering their email and selecting a class.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@school.edu"
              className="col-span-3"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="col-span-4 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Class
            </Label>
            <select
              id="class"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("class", { required: "Class is required" })}
            >
              <option value="all">All Classes</option>
              <option value="math101">Math 101</option>
              <option value="science202">Science 202</option>
              <option value="history303">History 303</option>
            </select>
            {errors.class && (
              <p className="col-span-4 text-sm text-red-500">
                {errors.class.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
