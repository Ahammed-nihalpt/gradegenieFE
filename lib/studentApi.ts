import api from "./axios";

export async function fetchStudentById(userId: string): Promise<IStudent[]> {
  const response = await api.get<{ data: IStudent[] }>(
    `/student/by/user/${userId}`
  );
  return response.data.data || [];
}
