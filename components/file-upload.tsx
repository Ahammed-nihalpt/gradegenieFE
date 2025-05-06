'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Camera, File, FileText, Plus, Upload, X } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete?: (files: File[], images: string[]) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MBx

export function FileUpload({
  onUploadComplete,
  trigger,
  title = 'Upload Files',
  description = 'Upload files or take photos',
}: FileUploadProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusMessage, setUploadStatusMessage] = useState('Uploading...');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      filesArray.forEach((file) => {
        if (file.type !== 'application/pdf') {
          invalidFiles.push(`${file.name} (Invalid type)`);
        } else if (file.size > MAX_FILE_SIZE) {
          invalidFiles.push(
            `${file.name} (Too large: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`
          );
        } else {
          validFiles.push(file);
        }
      });

      if (invalidFiles.length > 0) {
        toast({
          title: 'Invalid file(s) detected',
          description: `Some files were excluded:\n${invalidFiles.join(', ')}`,
          variant: 'destructive',
        });
      }

      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (activeTab === 'file' && selectedFiles.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files or capture images to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadStatusMessage('Uploading files...');
    setUploadProgress(10); // initial progress

    try {
      // Simulate file upload progress
      const simulateProgress = () => {
        setUploadProgress((prev) => {
          if (prev >= 90) return prev; // pause near end until real complete
          return prev + 10;
        });
      };

      const interval = setInterval(simulateProgress, 500);

      // Simulate initial file uploading
      setTimeout(() => {
        setUploadStatusMessage('AI is grading your assignment...');
      }, 2000);

      // Wait for actual API processing
      if (onUploadComplete) {
        await onUploadComplete(selectedFiles, []);
      }

      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatusMessage('Upload and grading complete');

      setTimeout(() => {
        setIsUploading(false);
        setOpen(false);
        setUploadProgress(0);
        setSelectedFiles([]);
        setUploadStatusMessage('Uploading...');
      }, 1000);
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: 'Upload Failed',
        description: 'Something went wrong during upload.',
        variant: 'destructive',
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerCameraInput = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button>Upload Files</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="file">Upload Files</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4 py-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="application/pdf"
              />
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF</p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files</h4>
                <ScrollArea className="h-[150px]">
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.name)}
                          <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{uploadStatusMessage}</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
