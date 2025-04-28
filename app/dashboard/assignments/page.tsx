"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, FileText, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAssignment } from "@/hooks/use-assignment";

export default function AssignmentsPage() {
  const { toast } = useToast();
  const { data: assignments = [] } = useAssignment();
  const [searchQuery, setSearchQuery] = useState(""); // <-- Add search query state

  // Filter assignments based on search query
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/create-assignment">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assignments..."
            className="w-[200px] pl-8 md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // <-- Update search query
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <Card key={assignment._id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>
                    {assignment?.courseId?.name}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    assignment.status === "active" ? "outline" : "secondary"
                  }
                >
                  {assignment.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>{assignment?.submissionsNo} submissions</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/dashboard/assignments/${assignment._id}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
