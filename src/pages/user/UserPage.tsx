import { userApiWrapper } from '../../api/wrapper/user/userApiWrapper';
import { CustomTable } from '../../components/Table/CustomTable';
import { UserTable } from '../../components/Table/UserTable';
import PageTemplate from '../../templates/PageTemplate';
import { HeadCell } from '../../types/etc';
import { IUserListResponseData } from '../../types/user/api';

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'User ID',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: '이메일',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: '닉네임',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: '권한',
  },
];

const tableHeads: (keyof IUserListResponseData)[] = ['id', 'email', 'username', 'role'];

export const UserPage = () => {
  function getUserList() {
    return userApiWrapper.userList();
  }

  return (
    <PageTemplate>
      <UserTable tableHeads={tableHeads} headCells={headCells} getData={getUserList} />
    </PageTemplate>
  );
};
