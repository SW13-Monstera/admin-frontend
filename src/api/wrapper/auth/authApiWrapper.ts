import { getUserInfo, setUserInfo } from './../../../utils/index';
import apiClient from '../../apiClient';
import { API_URL } from '../../../constants/apiUrl';
import { AUTHORIZTION, BEARER_TOKEN, ROLES } from '../../../constants';

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
    return apiClient.post(API_URL.LOGIN, data).then(
      (res: { data: ILoginResponse }) => {
        if (res.data.role !== ROLES.ROLE_ADMIN) {
          alert('권한 없음');
          throw new Error('권한 없음');
        }
        apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(res.data.accessToken);
        return res.data;
      },
      (err) => {
        alert('로그인 실패');
        console.log(err);
      },
    );
  },
  refresh: () => {
    const userInfo = getUserInfo();
    if (!userInfo) return new Error('localstorage.userInfo not found');

    apiClient
      .get(API_URL.REFRESH, {
        headers: { Authorization: BEARER_TOKEN(userInfo.accessToken) },
      })
      .then(
        (res) => {
          const newAccessToken = res.data.accessToken;
          apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(newAccessToken);
          setUserInfo({ ...userInfo, accessToken: newAccessToken });
        },
        (err) => {
          return;
        },
      );
  },
};
