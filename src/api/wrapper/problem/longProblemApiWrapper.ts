import {
  IProblemListRequest,
  ILongProblemListData,
  IProblemDetailRequest,
  IProblemDetailResponse,
  IProblemCreateData,
} from '../../../types/problem/api';
import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';

export const longProblemApiWrapper = {
  getLongProblemList: ({ id, title, description, page, size = 10 }: IProblemListRequest) => {
    const params = {
      id,
      title,
      description,
      page,
      size,
    };
    return apiClient
      .get(API_URL.PROBLEM_LIST, {
        params: params,
      })
      .then((response: { data: ILongProblemListData }) => {
        return response.data;
      });
  },
  getLongProblemDetail: ({ problem_id }: IProblemDetailRequest) => {
    return apiClient
      .get(API_URL.PROBLEM_DETAIL(problem_id))
      .then((response: { data: IProblemDetailResponse }) => {
        return response.data;
      });
  },
  createLongProblem: (data: IProblemCreateData) => {
    apiClient.post(API_URL.PROBLEM_CREATE, data);
  },
  updateLongProblem: (problem_id: number, data: IProblemCreateData) => {
    apiClient.put(API_URL.PROBLEM_UPDATE(problem_id), data);
  },
};
