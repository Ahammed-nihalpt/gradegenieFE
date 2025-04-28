import IAssignment from '@/types/assignment';
import api from './axios';

export async function fetchAssignment(userId: string): Promise<IAssignment[]> {
  const response = await api.get<{ assignment: IAssignment[] }>(`/assignment/by/user/${userId}`);
  return response.data.assignment || [];
}

export async function fetchAssignmentById(id: string): Promise<IAssignment | null> {
  const response = await api.get<{ assignment: IAssignment }>(`/assignment/${id}`);
  return response.data.assignment || null;
}
