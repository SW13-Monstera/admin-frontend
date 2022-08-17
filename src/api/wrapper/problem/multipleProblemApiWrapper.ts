import {
  IMultipleCreateRequest,
  IMultipleUpdateRequest,
} from './../../../types/problem/multipleApi';
import apiClient from '../../apiClient';
import { API_URL, API_URL_WITH_PARAMS } from '../../../constants/apiUrl';
import {
  IProblemDetailRequest,
  IProblemListData,
  IProblemListRequest,
} from '../../../types/problem/api';
import { IMultipleDetailResponseData } from '../../../types/problem/multipleApi';

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
      .then((response: { data: IProblemListData }) => {
        return response.data;
      });
  },
  getMultipleProblemDetail: ({ problem_id }: IProblemDetailRequest) => {
    return apiClient
      .get(API_URL_WITH_PARAMS.MULTIPLE_PROBLEM_DETAIL(problem_id))
      .then((response: { data: IMultipleDetailResponseData }) => {
        return response.data;
      });
  },
  createMultipleProblem: (data: IMultipleCreateRequest) => {
    apiClient.post(API_URL.MULTIPLE_PROBLEM_CREATE, data);
  },
  updateMultipleProblem: (problem_id: string, data: IMultipleUpdateRequest) => {
    apiClient.put(API_URL_WITH_PARAMS.MULTIPLE_PROBLEM_UPDATE(problem_id), data);
  },
};