import { useQuery } from '@tanstack/react-query'; // Import react-query's useQuery
import { fetchCourses, fetchCoursesById } from '../lib/courseApi'; // Import the function for fetching courses
import { useSession } from 'next-auth/react'; // If you're using next-auth for session management

export function useCourses() {
  const { data: session } = useSession(); // Access the session data

  return useQuery({
    queryKey: ['courses', session?.user.id],
    queryFn: () => fetchCourses(session?.user.id || ''),
    enabled: !!session?.user.id,
    retry: false,
  });
}

export function useCoursesById(id: string) {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['assignment', id],
    queryFn: () => fetchCoursesById(id),
    enabled: !!id,
    retry: false,
  });

  return {
    data,
    refetch, // This is the function you can use to manually trigger a refetch
    isLoading,
    isError,
  };
}
