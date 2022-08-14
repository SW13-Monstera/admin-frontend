import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';
import { USER_INFO } from '../../../constants/localStorage';

interface ILoginRequest {
  email: string;
  password: string;
}

export const authApiWrapper = {
  login: (data: ILoginRequest) => {
    return apiClient.post(API_URL.LOGIN, data).then((response) => {
      if (response.data.role !== 'ROLE_ADMIN') return new Error('관리자 권한이 없습니다.');
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      return response.data;
    });
  },
  refresh: () => {
    if (!localStorage.getItem(USER_INFO)) return new Error('localstorage.userInfo not found');

    apiClient
      .get(API_URL.REFRESH, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_INFO)!).accessToken}`,
        },
      })
      .then((response) => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        const json = JSON.parse(localStorage.getItem(USER_INFO)!);
        localStorage.setItem(
          USER_INFO,
          JSON.stringify({ ...json, accessToken: response.data.accessToken }),
        );
      });
  },
};
