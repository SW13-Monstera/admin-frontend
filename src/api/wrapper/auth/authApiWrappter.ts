import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  accessToken: string;
}

export const authApiWrapper = {
  login: (data: ILoginRequest) => {
    return apiClient.post(API_URL.LOGIN, data).then((response) => {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      return response.data;
    });
  },
};
