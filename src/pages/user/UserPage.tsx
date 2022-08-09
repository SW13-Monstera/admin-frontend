import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { userApiWrapper } from '../../api/wrapper/user/userApiWrapper';

interface IUserListResponseData {
  id: string;
  email: string;
  username: string;
  role: string;
}

export const UserPage = () => {
  const [users, setUsers] = useState<IUserListResponseData[]>([]);
  useEffect(() => {
    userApiWrapper.userList().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {users.map(({ id, email, username, role }) => (
        <Box sx={{ display: 'flex', gap: 1 }} key={id}>
          <Typography>{id}</Typography>
          <Typography>{email}</Typography>
          <Typography>{username}</Typography>
          <Typography>{role}</Typography>
        </Box>
      ))}
    </Box>
  );
};
