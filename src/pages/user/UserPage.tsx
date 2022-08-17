import { Typography } from '@mui/material';
import { userApiWrapper } from '../../api/wrapper/user/userApiWrapper';
import { BaseTable } from '../../components/Table/BaseTable';
import { useTable } from '../../hooks/useTable';
import PageTemplate from '../../templates/PageTemplate';
import { ITableHead } from '../../types/etc';

const tableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'User ID',
  },
  {
    id: 'email',
    name: '이메일',
  },
  {
    id: 'username',
    name: '닉네임',
  },
  {
    id: 'role',
    name: '권한',
  },
];

export const UserPage = () => {
  const { page, data, setData, totalElements, setTotalElements, handleChangePage } =
    useTable(getUserList);

  function getUserList() {
    userApiWrapper.userList().then((res) => {
      setData(res.data);
      setTotalElements(res.data.length);
    });
  }

  return (
    <PageTemplate>
      <Typography sx={{ mb: 2 }}>전체 사용자</Typography>
      <BaseTable
        tableHeads={tableHeads}
        data={data}
        page={page}
        handleChangePage={handleChangePage}
        totalElements={totalElements}
      />
    </PageTemplate>
  );
};
