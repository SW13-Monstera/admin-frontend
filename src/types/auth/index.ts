import { ROLES } from '../../constants';

export interface IUserInfo {
  accessToken: string;
  email: string;
  id: string;
  role: typeof ROLES;
  username: string;
}