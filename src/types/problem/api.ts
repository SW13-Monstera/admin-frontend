interface IProblemListRequest {
  id?: number;
  title?: string;
  description?: string;
  page?: number;
  size?: number;
}

interface ILongProblem {
  id: number;
  title: string;
  creator: string;
  avgKeywordScore: number | null;
  avgPromptScore: number | null;
  userAnswerCnt: number | null;
  isActive: boolean;
}

interface ILongProblemListData {
  problems: ILongProblem[];
  totalPages: number;
  totalElements: number;
}

interface IProblemDetailRequest {
  problem_id: number;
}

interface IStandardResponse extends IStandard {
  id: number;
}

interface IStandard {
  content: string;
  score: number;
  type: string;
}

interface IProblemDetailResponse {
  id: number;
  title: string;
  description: string;
  standardAnswer: string;
  tags: string[];
  gradingStandards: IStandardResponse[];
}

interface IProblemCreateData {
  title: string;
  description: string;
  standardAnswer: string;
  tags: string[];
  gradingStandards: IStandard[];
}

interface IProblemUpdateData extends IProblemCreateData {
  isActive: boolean;
  isGradable: boolean;
}

export type {
  IProblemListRequest,
  ILongProblem,
  ILongProblemListData,
  IProblemDetailRequest,
  IStandardResponse,
  IStandard,
  IProblemDetailResponse,
  IProblemCreateData,
  IProblemUpdateData,
};
