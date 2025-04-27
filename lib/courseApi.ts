import api from "./axios";

export async function fetchCourses(userId: string): Promise<ICourse[]> {
  const response = await api.get<{ courses: ICourse[] }>(
    `/course/by/user/${userId}`
  );
  return response.data.courses || [];
}
