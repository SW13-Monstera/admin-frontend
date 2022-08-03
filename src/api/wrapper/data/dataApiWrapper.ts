import {
  IDataListRequest,
  IDataListCreateRequestData,
  IDataDetailRequest,
} from '../../../types/data/api';
import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';

export const dataApiWrapper = {
  getDataList: ({
    id,
    assignedBy,
    validatedBy,
    problemTitle,
    answer,
    isLabeled,
    isValidated,
    page,
    size = 10,
  }: IDataListRequest) => {
    const params = {
      id,
      assignedBy,
      validatedBy,
      problemTitle,
      answer,
      isLabeled,
      isValidated,
      page,
      size,
    };

    return apiClient.get(API_URL.DATA_LIST, {
      params: params,
    });
  },
  postDataList: (data: IDataListCreateRequestData) => {
    apiClient.post(API_URL.DATA_LIST_CREATE, data);
  },
  getDataDetail: ({ user_answer_id }: IDataDetailRequest) => {
    return apiClient.get(API_URL.DATA_DETAIL(user_answer_id)).then((response) => response.data);
  },
  labelingData: ({ user_answer_id, selectedGradingStandardIds }: IDataDetailRequest) => {
    const data = { selectedGradingStandardIds };
    apiClient.post(API_URL.DATA_LABELING(user_answer_id), data);
  },
  validatingData: ({ user_answer_id, selectedGradingStandardIds }: IDataDetailRequest) => {
    const data = { selectedGradingStandardIds };
    apiClient.post(API_URL.DATA_VALIDATING(user_answer_id), data);
  },
};
