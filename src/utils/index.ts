import { USER_INFO } from '../constants/localStorage';
import { IUserInfo } from '../types/auth';

export const roundToSecondDigit = (num: number) => Math.round(num * 100) / 100;

export const parseDateTime = (str: string) => {
  const dateString = Date.parse(str);
  if (!isNaN(dateString)) {
    const newDate = new Date(dateString);
    return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일 ${newDate.getHours()}시 ${newDate.getMinutes()}분`;
  } else {
    return str;
  }
};

export const setUserInfo = (userInfo: IUserInfo) => {
  try {
    const userInfoString = JSON.stringify(userInfo);
    localStorage.setItem(USER_INFO, userInfoString);
  } catch {
    throw new Error('invalid json string format');
  }
};

export const getUserInfo = (): IUserInfo => {
  const userInfoString = localStorage.getItem(USER_INFO);
  if (!userInfoString) throw new Error('userinfo not found');

  try {
    const userInfo = JSON.parse(userInfoString);
    return userInfo;
  } catch {
    throw new Error('invalid json format');
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};
