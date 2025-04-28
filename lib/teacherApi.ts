import api from "./axios";

export async function fetchTeacherById(userId: string): Promise<ITeacher[]> {
  const response = await api.get<{ teachers: ITeacher[] }>(
    `/teacher/by/user/${userId}`
  );
  return response.data.teachers || [];
}
