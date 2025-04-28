import { useQuery } from "@tanstack/react-query";
import { fetchTeacherById } from "@/lib/teacherApi";

export function useTeacherByUserId(userId: string) {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["teacher", userId],
    queryFn: () => fetchTeacherById(userId),
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
