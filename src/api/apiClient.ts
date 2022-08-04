import axios from 'axios';
import { API_BASE_URL } from '../../global';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// isLogin? -> localstorage userInfo check -> 아래 로직 세팅
try {
  const userInfoString = localStorage.getItem('userInfo');
  if (userInfoString !== null) {
    const userInfo = JSON.parse(userInfoString);
    const token: string | null | undefined = userInfo.accessToken;
    if (typeof token === 'string') {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
} catch (e) {}

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { status } = err.response;

    if (status !== 200) {
      // window.location.replace('/');
    }
    return Promise.reject(err);
  },
);

export default apiClient;
