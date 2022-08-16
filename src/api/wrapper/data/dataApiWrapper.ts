import {
  IDataListRequest,
  IDataListCreateRequestData,
  IDataDetailRequest,
  IDataListResponse,
} from '../../../types/data/api';
import apiClient from '../../apiClient';
import { API_URL, API_URL_WITH_PARAMS } from '../../../constants/apiUrl';

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

    return apiClient
      .get(API_URL.DATA_LIST, {
        params: params,
      })
      .then((res: { data: IDataListResponse }) => res.data);
  },
  postDataList: (data: IDataListCreateRequestData) => {
    apiClient.post(API_URL.DATA_LIST_CREATE, data).then((response) => response.data);
  },
  getDataDetail: ({ user_answer_id }: IDataDetailRequest) => {
    return apiClient
      .get(API_URL_WITH_PARAMS.DATA_DETAIL(user_answer_id))
      .then((response) => response.data);
  },
  labelingData: ({ user_answer_id, selectedGradingStandardIds }: IDataDetailRequest) => {
    const data = { selectedGradingStandardIds };
    apiClient.post(API_URL_WITH_PARAMS.DATA_LABELING(user_answer_id), data);
  },
  validatingData: ({ user_answer_id, selectedGradingStandardIds }: IDataDetailRequest) => {
    const data = { selectedGradingStandardIds };
    apiClient.post(API_URL_WITH_PARAMS.DATA_VALIDATING(user_answer_id), data);
  },
};
