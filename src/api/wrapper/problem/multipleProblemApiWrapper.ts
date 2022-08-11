import apiClient from '../../apiClient';
import { API_URL, API_URL_WITH_PARAMS } from '../../../constants/apiUrl';
import { IProblemDetailRequest, IProblemListRequest } from '../../../types/problem/api';

export const multipleProblemApiWrapper = {
  getMultipleProblemList: ({ id, title, description, page, size = 10 }: IProblemListRequest) => {
    const params = {
      id,
      title,
      description,
      page,
      size,
    };
    return apiClient
      .get(API_URL.MULTIPLE_PROBLEM_LIST, {
        params: params,
      })
      .then((response: { data: any }) => {
        return response.data;
      });
  },
  getMultipleProblemDetail: ({ problem_id }: IProblemDetailRequest) => {
    return apiClient
      .get(API_URL_WITH_PARAMS.MULTIPLE_PROBLEM_DETAIL(problem_id))
      .then((response: { data: any }) => {
        return response.data;
      });
  },
  createMultipleProblem: (data: any) => {
    apiClient.post(API_URL.MULTIPLE_PROBLEM_CREATE, data);
  },
  updateMultipleProblem: (problem_id: string, data: any) => {
    apiClient.put(API_URL_WITH_PARAMS.MULTIPLE_PROBLEM_UPDATE(problem_id), data);
  },
};
