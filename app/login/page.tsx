'use client';
import type React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/dashboard/assignments'); // or wherever you want to redirect after login
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left side - Benefits and testimonials (hidden on mobile) */}
      <div className="hidden w-1/2 flex-col justify-between bg-mint/20 p-10 dark:bg-gray-800/50 lg:flex">
        <div>
          <Logo size="lg" />
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-onest">
            Welcome back to GradeGenie
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The AI-powered grading assistant that saves teachers 5+ hours every week.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Grade assignments in minutes, not hours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Provide detailed feedback automatically
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Used by 10,000+ educators in 500+ schools
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M17 9.2c-.03-1.21-.78-1.94-2.2-2.14"></path>
                  <path d="M9.2 9.2c.03-1.21.78-1.94 2.2-2.14"></path>
                  <path d="M5 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9z"></path>
                  <path d="m8 17 4-5 4 5"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  "GradeGenie has transformed my teaching workflow. I can focus on what matters most
                  - teaching!"
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  — Sarah Johnson, High School English Teacher
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} GradeGenie. All rights reserved.
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <Card className="w-full max-w-md border-0 shadow-lg lg:shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center lg:hidden">
              <Logo size="md" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">Log in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-5 w-5 text-[#4285F4]" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <MicrosoftIcon className="mr-2 h-5 w-5 text-[#00A4EF]" />
                Microsoft
              </Button>
            </div> */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              {/* <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" size="lg" onClick={handleLogin}>
              Log in
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up for free
              </Link>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <ShieldCheck className="mr-1 h-3 w-3" /> Secure login
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
