import { useQuery } from '@tanstack/react-query'; // Import react-query's useQuery
import { fetchStudentById } from '@/lib/studentApi';

export function useStudentByUserId(userId: string) {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['student', userId],
    queryFn: () => fetchStudentById(userId),
    enabled: !!userId,
    retry: false,
  });

  return {
    data,
    refetch, // This is the function you can use to manually trigger a refetch
    isLoading,
    isError,
  };
}
