import { ROLES } from '../../constants';

export interface IUserListResponseData {
  id: string;
  email: string;
  username: string;
  role: typeof ROLES;
}

export interface IUserListRequestParams {
  page: number;
}
