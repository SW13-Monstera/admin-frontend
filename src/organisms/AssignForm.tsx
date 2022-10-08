import { Box, Button, Input } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { userApiWrapper } from '../api/wrapper/user/userApiWrapper';
import Dropdown from '../components/Dropdown/Dropdown';
import { IMenuItem } from '../types/etc/dropdown';

interface IAssignForm {
  minId: number;
  maxId: number;
  submit: (nums: number[], adminId: string) => void;
}

export const AssignForm = ({ minId, maxId, submit }: IAssignForm) => {
  const [startId, setStartId] = useState(0);
  const [endId, setEndId] = useState(0);
  const [adminId, setAdminId] = useState('');
  const { data: adminIdList } = useQuery('adminList', userApiWrapper.adminUserList);
  const onSubmit = () => {
    const nums = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId);
    submit(nums, adminId);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          width: '100%',
          height: 'fit-content',
        }}
      >
        <Input
          id='start'
          type='number'
          defaultValue={0}
          inputProps={{
            min: minId,
            max: maxId,
          }}
          sx={{
            mr: 1,
            width: 'fit-content',
            minWidth: '40px',
            display: 'block',
            textAlign: 'center',
          }}
          onChange={(e) => setStartId(parseInt(e.target.value))}
        />
        {' ~ '}
        <Input
          id='end'
          type='number'
          defaultValue={0}
          inputProps={{
            min: minId,
            max: maxId,
          }}
          sx={{
            mr: 1,
            width: 'fit-content',
            minWidth: '40px',
            display: 'block',
            textAlign: 'center',
          }}
          onChange={(e) => setEndId(parseInt(e.target.value))}
        />
      </Box>
      <Dropdown
        menuItems={
          adminIdList?.map((e) => {
            return { value: e.id, name: e.username } as IMenuItem;
          }) ?? []
        }
        id={1}
        updateCondition={(event, id) => {
          setAdminId(event);
        }}
      />
      <Button onClick={onSubmit} variant='contained'>
        확인
      </Button>
    </Box>
  );
};
