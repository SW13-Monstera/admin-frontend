import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';
import { USER_INFO } from '../../../constants/localStorage';
import { AUTHORIZTION, BEARER_TOKEN, ROLES } from '../../../constants';

interface ILoginRequest {
  email: string;
  password: string;
}

export const authApiWrapper = {
  login: (data: ILoginRequest) => {
    return apiClient.post(API_URL.LOGIN, data).then((response) => {
      if (response.data.role !== ROLES.ROLE_ADMIN) {
        alert('권한 없음');
        throw new Error('권한 없음');
      }
      apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(response.data.token);
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
        apiClient.defaults.headers.common[AUTHORIZTION] = `Bearer ${response.data.accessToken}`;
        const json = JSON.parse(localStorage.getItem(USER_INFO)!);
        localStorage.setItem(
          USER_INFO,
          JSON.stringify({ ...json, accessToken: response.data.accessToken }),
        );
      });
  },
};
