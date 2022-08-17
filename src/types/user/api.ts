import { ROLES } from '../../constants';

export interface IUserListResponseData {
  id: string;
  email: string;
  username: string;
  role: typeof ROLES;
}
