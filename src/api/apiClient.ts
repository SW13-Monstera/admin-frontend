import { getUserInfo } from './../utils/index';
import axios from 'axios';
import { AUTHORIZTION, BEARER_TOKEN } from '../constants';
import { authApiWrapper } from './wrapper/auth/authApiWrapper';

const apiClient = axios.create({
  baseURL: 'https://dev.api.csbroker.io/api',
  withCredentials: true,
});

// isLogin? -> localstorage userInfo check -> 아래 로직 세팅
try {
  const userInfo = getUserInfo();
  if (userInfo) {
    const token: string | null | undefined = userInfo.accessToken;
    if (typeof token === 'string') {
      apiClient.defaults.headers.common[AUTHORIZTION] = BEARER_TOKEN(token);
    }
  }
} catch (e) {}

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { status } = err.response;

    if (status === 401) {
      authApiWrapper.refresh();
    } else if (status === 400) {
      // location.reload();
    } else if (status !== 200) {
      // window.location.replace('/');
    }
    return Promise.reject(err);
  },
);

export default apiClient;
