import { ISubmission } from "./submission";

interface IAssignment {
  assignmentType: string;
  subType: string[];
  title: string;
  courseId: {
    _id: string;
    name: string;
  }; // <-- changed to courseId
  dueDate?: string;
  description: string;
  learningObjectives?: string;
  totalPoints: number;
  instructions: string; // <-- added responseInstructions
  rubric: string; // <-- added responseInstructions
  userId: string;
  status: string;
  _id: string;
  submissionsNo: number;
  submissions: ISubmission[]; // <-- added submissions
}

export default IAssignment;
