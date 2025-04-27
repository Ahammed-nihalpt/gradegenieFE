import { useQuery } from "@tanstack/react-query"; // Import react-query's useQuery
import { fetchCourses } from "../lib/courseApi"; // Import the function for fetching courses
import { useSession } from "next-auth/react"; // If you're using next-auth for session management

export function useCourses() {
  const { data: session } = useSession(); // Access the session data

  return useQuery({
    queryKey: ["courses", session?.user.id],
    queryFn: () => fetchCourses(session?.user.id || ""),
    enabled: !!session?.user.id,
    retry: false,
  });
}
