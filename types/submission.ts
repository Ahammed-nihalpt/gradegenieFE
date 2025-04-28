export interface InlineComment {
  id: string;
  startIndex: number;
  endIndex: number;
  text: string;
  color: string;
  timestamp: string;
  author: string;
  isAIGenerated?: boolean;
}

interface AICheckerResults {
  score: number;
  confidence: 'High' | 'Medium' | 'Low'; // stricter typing
  details: {
    section: string;
    aiProbability: number;
    humanProbability: number;
  }[];
}

export interface SubScore {
  name: string;
  score: number;
  maxScore: number;
  rationale: string;
}

export interface OverallFeedback {
  strengths: string;
  improvements: string;
  actionItems: string;
}

export interface ISubmission {
  _id: string;
  assignmentId?: string;
  studentId?: string;
  studentName?: string;
  fileName?: string;
  fileUrl?: string[];
  score?: number;
  createdAt: string;
  content: string;
  comments?: {
    strengths?: string;
    improvementAreas?: string;
    actionItems?: string;
    subScores?: {
      analyticalArgument?: number;
      engagementWithText?: number;
      useLiteraryDevices?: number;
      academicWriting?: number;
    };
    justification?: string;
  };
  inlineComments?: InlineComment[]; // Optional
  subScores?: SubScore[]; // Optional
  overallFeedback?: OverallFeedback; // Optional
  status?: 'Graded' | 'Pending' | 'In Progress';
  submissionTime?: string;
  aiCheckerResults: AICheckerResults;
  integrityCheck?: {
    status?: 'Clear' | 'Flagged' | 'Checking...' | 'Not Run';
    aiDetection?: {
      score?: number;
      confidence?: 'High' | 'Medium' | 'Low';
      flaggedPhrases?: string[];
    };
    plagiarism?: {
      matchPercentage?: number;
      sources?: Array<{
        url?: string;
        matchPercentage?: number;
        title?: string;
      }>;
    };
  };
}
