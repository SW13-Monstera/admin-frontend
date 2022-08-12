export interface IProblemListRequest {
  id?: number;
  title?: string;
  description?: string;
  page?: number;
  size?: number;
}

export interface ILongProblem {
  id: number;
  title: string;
  creator: string;
  avgKeywordScore: number | null;
  avgPromptScore: number | null;
  userAnswerCnt: number | null;
  isActive: boolean;
}

export interface ILongProblemListData {
  problems: ILongProblem[];
  totalPages: number;
  totalElements: number;
}

export interface IProblemDetailRequest {
  problem_id: string;
}

export interface IStandardResponse extends IStandard {
  id: number;
}

export interface IStandard {
  content: string;
  score: number;
  type: string;
}

export interface IProblemDetailResponse {
  id: number;
  title: string;
  description: string;
  standardAnswer: string;
  tags: string[];
  gradingStandards: IStandardResponse[];
}

export interface IProblemCreateData {
  title: string;
  description: string;
  standardAnswer: string;
  tags: string[];
  gradingStandards: IStandard[];
}

export interface IProblemUpdateData extends IProblemCreateData {
  isActive: boolean;
  isGradable: boolean;
}

export interface IProblemListElement {
  id: number;
  title: string;
  creator: string;
  userAnswerCnt: number;
  isActive: boolean;
  answerRate?: number | null;
  avgKeywordScore?: number | null;
  avgPromptScore?: number | null;
}
