export interface ICreateShortProblemRequest {
  title: string;
  description: string;
  tags: string[];
  answer: string;
  score: number;
}

export interface IShortProblemDetailResponse extends ICreateShortProblemRequest {
  id: number;
}

export interface IShortProblemListResponse {
  problems: IShortProblemListElement[];
}

export interface IShortProblemListElement {
  id: number;
  title: string;
  creator: string;
  answerRate: number | null;
  userAnswerCnt: number;
  isActive: boolean;
}

export interface IMultipleProblemListElement {
  id: number;
  title: string;
  creator: string;
  answerRate: number | null;
  userAnswerCnt: number;
  isActive: boolean;
}
