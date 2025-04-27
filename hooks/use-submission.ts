import { fetchSubmissionById } from "@/lib/submissionApi";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useSubmissionById(id: string, assignmentId: string) {
  const { data: session } = useSession(); // Access the session data

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["assignment", id],
    queryFn: () => fetchSubmissionById(id, assignmentId),
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
