import api from "./axios";
import { ISubmission } from "@/types/submission";

export async function fetchSubmissionById(
  id: string,
  assignmentId: string
): Promise<ISubmission> {
  const response = await api.get<{ submission: ISubmission }>(
    `/submission/${assignmentId}/${id}`
  );
  return response.data.submission || [];
}
