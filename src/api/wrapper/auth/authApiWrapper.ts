import { getUserInfo, setUserInfo } from './../../../utils/index';
import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';
import { AUTHORIZTION, BEARER_TOKEN, ROLES } from '../../../constants';

interface ILoginRequest {
  email: string;
  password: string;
}

export const authApiWrapper = {
  login: (data: ILoginRequest) => {
    return apiClient.post(API_URL.LOGIN, data).then((res) => {
      if (res.data.role !== ROLES.ROLE_ADMIN) {
        alert('권한 없음');
        throw new Error('권한 없음');
      }
      apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(res.data.token);
      return res.data;
    });
  },
  refresh: () => {
    const userInfo = getUserInfo();
    if (!userInfo) return new Error('localstorage.userInfo not found');

    apiClient
      .get(API_URL.REFRESH, {
        headers: { Authorization: BEARER_TOKEN(getUserInfo().accessToken) },
      })
      .then((res) => {
        apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(res.data.accessToken);
        setUserInfo({ ...userInfo, accessToken: res.data.accessToken });
      });
  },
};
