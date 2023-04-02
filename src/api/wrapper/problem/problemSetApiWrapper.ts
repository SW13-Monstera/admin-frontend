import { API_URL } from '../../../constants/apiUrl';
import { TProblemSetListResponse } from '../../../types/problem/problemSetApi';
import apiClient from '../../apiClient';

export const problemSetApiWrapper = {
  getProblemSet: async () => {
    const res = await apiClient.get<TProblemSetListResponse>(API_URL.PROBLEM_LIST);
    return res.data;
  },
  createProblemSet: () => {},
  updateProblemSet: () => {},
};
