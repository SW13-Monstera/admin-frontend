import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';

export const userApiWrapper = {
  userList: () => {
    return apiClient.get(API_URL.USER_LIST);
  },
};
