"use client";

import { PlusCircle, Upload, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsList } from "./students-list";
import { CoTeachersList } from "./co-teachers-list";
import { useToast } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface AddStudentFormData {
  name: string;
  email: string;
  class: string;
}

export default function ClassroomPage() {
  const { toast } = useToast();
  const { data: session } = useSession(); // Access the session data
  const [isDialogOpen, setDialogOpen] = useState(false); // Dialog open state

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
      // Simulate API call
      await api.post(`/student/add`, {
        userId: session?.user.id,
        ...data,
      });

      toast({
        title: "Student Added",
        description: "The student has been successfully added.",
      });
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Classroom Management
          </h1>
          <p className="text-muted-foreground">
            Manage your students and co-teachers for all your classes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Co-Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Co-Teacher</DialogTitle>
              <DialogDescription>
                Enter the email address of the teacher you want to invite as a
                co-teacher for this class.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher@school.edu"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <select
                  id="class"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="all">All Classes</option>
                  <option value="math101">Math 101</option>
                  <option value="science202">Science 202</option>
                  <option value="history303">History 303</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  toast({
                    title: "Invitation sent",
                    description:
                      "The co-teacher invitation has been sent successfully.",
                  });
                }}
              >
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="students" className="mt-6">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="co-teachers">Co-Teachers</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Class Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Submissions This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Students</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Students
                </Button>
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
                        Enter the details of the student to add them to the
                        class.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="grid gap-4 py-4"
                    >
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="col-span-3"
                          {...register("name", {
                            required: "Name is required",
                          })}
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
                          {...register("email", {
                            required: "Email is required",
                          })}
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
                          {...register("class", {
                            required: "Class is required",
                          })}
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
              </div>
            </div>
            <StudentsList />
          </div>
        </TabsContent>

        <TabsContent value="co-teachers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Co-Teacher Management</CardTitle>
              <CardDescription>
                Share access to your classes with other teachers. Each
                co-teacher counts as one seat in your plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoTeachersList />
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <Users className="mr-2 inline-block h-4 w-4" />
                Using 2 of 5 available seats
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Co-Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Co-Teacher</DialogTitle>
                    <DialogDescription>
                      Enter the email address of the teacher you want to invite
                      as a co-teacher for this class.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="teacher@school.edu"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="class" className="text-right">
                        Class
                      </Label>
                      <select
                        id="class"
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="all">All Classes</option>
                        <option value="math101">Math 101</option>
                        <option value="science202">Science 202</option>
                        <option value="history303">History 303</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => {
                        toast({
                          title: "Invitation sent",
                          description:
                            "The co-teacher invitation has been sent successfully.",
                        });
                      }}
                    >
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
