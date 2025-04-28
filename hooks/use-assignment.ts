import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchAssignment, fetchAssignmentById } from '@/lib/assignmentApi';

export function useAssignment() {
  const { data: session } = useSession(); // Access the session data

  return useQuery({
    queryKey: ['assignment', session?.user.id],
    queryFn: () => fetchAssignment(session?.user.id || ''),
    enabled: !!session?.user.id,
    retry: false,
  });
}

export function useAssignmentById(id: string) {
  const { data: session } = useSession(); // Access the session data

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['assignment', id],
    queryFn: () => fetchAssignmentById(id),
    enabled: !!session?.user.id,
    retry: false,
  });

  return {
    data,
    refetch, // This is the function you can use to manually trigger a refetch
    isLoading,
    isError,
  };
}
