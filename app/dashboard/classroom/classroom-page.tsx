'use client';

import { Upload, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentsList } from './students-list';
import { CoTeachersList } from './co-teachers-list';
import { useToast } from '@/components/ui/toast';
import { AddStudentForm } from './_components/add-student-form';
import { AddCoTeacherForm } from './_components/add-co-teacher-form';
import { useStudentByUserId } from '@/hooks/use-student';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function ClassroomPage() {
  const { data: session } = useSession();
  const { data: students } = useStudentByUserId(session?.user.id || '');
  const [submissionsThisMonth, setSubmissionsThisMonth] = useState<number | null>(null);
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/submission/total/by/month/${session?.user.id}`);
        console.log('🚀 ~ fetchSubmissions ~ response:', response.data.total);
        setSubmissionsThisMonth(response.data.total);
      } catch (error) {
        console.error('Error fetching submissions this month:', error);
      }
    };
    if (session?.user.id) {
      fetchSubmissions();
    }
  }, [session?.user.id]);
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classroom Management</h1>
          <p className="text-muted-foreground">
            Manage your students and co-teachers for all your classes
          </p>
        </div>
        <AddCoTeacherForm />
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
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Class Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Submissions This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissionsThisMonth || 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Students</h2>
              <div className="flex gap-2">
                {/* <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Students
                </Button> */}
                <AddStudentForm />
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
                Share access to your classes with other teachers. Each co-teacher counts as one seat
                in your plan.
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
              <AddCoTeacherForm />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
