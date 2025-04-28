"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PlusCircle } from "lucide-react";
import { useStudentByUserId } from "@/hooks/use-student";

interface AddStudentFormData {
  name: string;
  email: string;
  class: string;
}

export function AddStudentForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { refetch } = useStudentByUserId(session?.user.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStudentFormData>({
    defaultValues: {
      name: "",
      email: "",
      class: "all",
    },
  });

  const onSubmit = async (data: AddStudentFormData) => {
    try {
      await api.post(`/student/add`, {
        userId: session?.user.id,
        ...data,
      });

      toast({
        title: "Student Added",
        description: "The student has been successfully added.",
      });
      setDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details of the student to add them to the class.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="col-span-3"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="student@school.edu"
              className="col-span-3"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Class
            </Label>
            <select
              id="class"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              {...register("class", { required: "Class is required" })}
            >
              <option value="all">All Classes</option>
              <option value="math101">Math 101</option>
              <option value="science202">Science 202</option>
              <option value="history303">History 303</option>
            </select>
            {errors.class && (
              <span className="text-red-600 text-sm">
                {errors.class.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
