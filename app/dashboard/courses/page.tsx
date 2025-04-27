"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchCourses(userId: string) {
  const response = await api.get<{ courses: Course[] }>(
    `/course/by/user/${userId}`
  );
  return response.data.courses || [];
}

export default function CoursesPage() {
  const { data: session } = useSession();
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", session?.user.id], // Ensure the userId is part of the query key for cache management
    queryFn: () => fetchCourses(session?.user.id || ""), // Pass the userId to fetchCourses
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          heading="Courses"
          subheading="Manage your courses and create new ones"
        />
        <Button asChild>
          <Link
            href="/dashboard/courses/create"
            title="Create a new course with details and AI-generated syllabus"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{course.students}</span>{" "}
                  Students
                </div>
                <div>
                  <span className="font-medium">{course.assignments}</span>{" "}
                  Assignments
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild className="w-full">
                <Link href={`/dashboard/courses/${course._id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
