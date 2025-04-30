'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Share2, Edit } from 'lucide-react';
import Link from 'next/link';
import { FileUpload } from '@/components/file-upload';
import { useParams, useRouter } from 'next/navigation';
import { use, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/axios';
import { fetchAssignmentById } from '@/lib/assignmentApi';
import { useAssignmentById } from '@/hooks/use-assignment';
import { ISubmission } from '@/types/submission';
import { useStudentByUserId } from '@/hooks/use-student';
import { useSession } from 'next-auth/react';

export default function AssignmentDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const { data: assignment, refetch } = useAssignmentById(id as string);
  const { data: student } = useStudentByUserId(session?.user.id || '');
  const [assignNameOpen, setAssignNameOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ISubmission | null>(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [manualStudentName, setManualStudentName] = useState('');
  const [activeTab, setActiveTab] = useState('select');
  const { toast } = useToast();

  const handleUploadComplete = async (files: File[], images: string[]) => {
    const formData = new FormData();

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append('files[]', file);
      });
    }

    if (images.length > 0) {
      images.forEach((image) => {
        const blob = new Blob([image], { type: 'image/jpeg' });
        formData.append('images[]', blob, `image-${Date.now()}.jpg`);
      });
    }

    formData.append('assignmentId', id as string);

    try {
      await api.post('/submission/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      refetch(); // Trigger refetch after data upload
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your files.',
        variant: 'destructive',
      });
    }
  };

  const handleEditAssignment = () => {
    // Navigate to the edit assignment page with the current assignment data
    router.push(`/dashboard/assignments/${id as string}/edit`);
  };

  const handleAssignName = async () => {
    const studentName = activeTab === 'select' ? selectedStudent : manualStudentName;
    const body =
      activeTab === 'select' && selectedStudent
        ? {
            studentId: selectedStudent,
          }
        : {
            studentName: manualStudentName,
          };
    try {
      await api.put(`/submission/edit/${selectedSubmission?._id}`, body);
      toast({
        title: 'Success',
        description: `Submission assigned to ${studentName}`,
      });
      refetch();
      setAssignNameOpen(false);
      setSelectedSubmission(null);
      setSelectedStudent('');
      setManualStudentName('');
    } catch (error) {
      console.error('Error assigning name:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign student name.',
        variant: 'destructive',
      });
    }

    // Here you would update the submission with the student name
    // This is a placeholder for the actual implementation
  };

  const openAssignNameDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setAssignNameOpen(true);
  };

  const handleDownload = async (submissionId: string) => {
    try {
      const response = await api.get(`/submission/download/file/${submissionId}`, {
        responseType: 'blob',
      });

      // Extract filename from headers or fallback
      const disposition = response.headers['content-disposition'];
      const fileNameMatch = disposition?.match(/filename="?(.+)"?/);
      const fileName = fileNameMatch?.[1] || `submission-${submissionId}.pdf`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: 'There was a problem downloading the file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{assignment?.title}</h1>
          <p className="text-muted-foreground">
            Due: {assignment?.dueDate && new Date(assignment?.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <FileUpload
            trigger={<Button>Submit Assignment</Button>}
            title="Submit Assignment"
            description="Upload your completed assignment. You can upload files or take photos."
            onUploadComplete={handleUploadComplete}
          />
          <Button variant="outline" onClick={handleEditAssignment}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Assignment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{assignment?.description}</p>
          <p className="mt-2">
            <strong>Total Points:</strong> 100
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>{assignment?.submissions.length} submissions received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignment?.submissions.map((submission) => (
              <div
                key={submission._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>
                      {submission?.studentName ||
                        submission?.studentId?.name
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('') ||
                        '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {submission?.studentName || submission?.studentId?.name ? (
                      <p className="font-medium">
                        {submission.studentName || submission?.studentId?.name}
                      </p>
                    ) : (
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-blue-500"
                        onClick={() => openAssignNameDialog(submission)}
                      >
                        Assign Student Name
                      </Button>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {submission?.status?.toLocaleLowerCase() === 'graded' ? (
                    <Badge className="bg-green-500">
                      {submission?.score || submission?.aiCheckerResults.score}/100
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild title="Download">
                      <span role="button" onClick={() => handleDownload(submission._id)}>
                        <Download className="h-4 w-4" />
                      </span>
                    </Button>
                    <Button variant="outline" size="icon" asChild title="Review">
                      <Link
                        href={`/dashboard/assignments/${
                          id as string
                        }/submissions/${submission._id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={assignNameOpen} onOpenChange={setAssignNameOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Student Name</DialogTitle>
            <DialogDescription>
              This submission doesn't have a student name. Please assign a student to it.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Student</TabsTrigger>
              <TabsTrigger value="manual">Enter Manually</TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="student-select">Select from class roster</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student-select">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* This would be populated from your actual student list */}
                    {student?.map((value) => (
                      <SelectItem value={value._id}>{value?.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Enter student name</Label>
                <Input
                  id="student-name"
                  value={manualStudentName}
                  onChange={(e) => setManualStudentName(e.target.value)}
                  placeholder="e.g., John Doe"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button onClick={handleAssignName}>Assign Name</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
