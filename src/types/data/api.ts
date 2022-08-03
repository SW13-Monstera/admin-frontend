interface IDataListRequest {
  id?: number;
  assignedBy?: string;
  validatedBy?: string;
  problemTitle?: string;
  answer?: string;
  isLabeled?: boolean;
  isValidated?: boolean;
  size?: number;
  page?: number;
}

interface IDataListElement {
  id: number;
  problemTitle: string;
  assignedUsername: string;
  validatingUsername: string;
  updatedAt: string;
  isLabeled: boolean;
  isValidated: boolean;
}

interface IDataListResponse {
  userAnswers: IDataListElement[];
}

interface IDataDetailRequest {
  user_answer_id: number;
  selectedGradingStandardIds?: number[];
}

interface IUserAnswer {
  assignedUserId: string;
  validatingUserId: string;
  answer: string;
  problemId: number;
}

interface IDataListCreateRequestData {
  size: number;
  userAnswers: IUserAnswer[];
}

export type {
  IDataListRequest,
  IDataDetailRequest,
  IUserAnswer,
  IDataListCreateRequestData,
  IDataListResponse,
  IDataListElement,
};
