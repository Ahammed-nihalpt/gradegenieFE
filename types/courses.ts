import IAssignment from "./assignment";

interface IRequiredMaterial {
  title: string;
  author: string;
  publisher: string;
  year: number;
  required: boolean;
}

interface IGradingPolicy {
  description: string;
  percentage: number;
}

interface IWeeklySchedule {
  week: number;
  topic: string;
  readings: string;
  assignment: string;
}

interface ICoursePolicy {
  policyName: string;
  description: string;
}

interface ISyllabus {
  learningObjectives: string[];
  requiredMaterials: IRequiredMaterial[];
  gradingPolicy: IGradingPolicy[];
  weeklySchedule: IWeeklySchedule[];
  coursePolicies: ICoursePolicy[];
}
export default interface ICourse {
  _id: string;
  name: string;
  description: string;
  subject: string;
  students?: number;
  assignmentCount?: number;
  assignments?: IAssignment[];
  gradeLevel: string;
  instructorName: string;
  isDraft: boolean;
  currentStep: number;
  syllabusmd: string;
  syllabus: ISyllabus;
}
