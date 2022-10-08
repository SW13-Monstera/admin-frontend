import {
  IAdminUserResponseData,
  IUserListRequestParams,
  IUserListResponseData,
} from './../../../types/user/api';
import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';

export const userApiWrapper = {
  userList: (params?: IUserListRequestParams) => {
    return apiClient
      .get(API_URL.USER_LIST, { params: params })
      .then((res: { data: IUserListResponseData[] }) => res.data);
  },
  adminUserList: () => {
    return apiClient
      .get(API_URL.ADMIN_USER_LIST)
      .then((res: { data: IAdminUserResponseData[] }) => res.data);
  },
};
