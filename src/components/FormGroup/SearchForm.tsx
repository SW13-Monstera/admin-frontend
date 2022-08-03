import { Box, TextField } from '@mui/material';
import Dropdown from '../Dropdown/Dropdown';
import { DeleteButton } from '../Button/DeleteButton';
import { useEffect } from 'react';

interface ISearchForm {
  id: string;
  condition: string;
  content: string;
  menuItems: any[];
  deleteFilter: (event: any) => void;
}

export const SearchForm = ({ id, condition, content, menuItems, deleteFilter }: ISearchForm) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Dropdown title='검색 조건' menuItems={menuItems} defaultValue={condition} />
      <TextField id='outlined-basic' variant='outlined' type='search' defaultValue={content} />
      <DeleteButton id={id} onClick={deleteFilter} />
    </Box>
  );
};
