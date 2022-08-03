import { Box, TextField } from '@mui/material';
import Dropdown from '../Dropdown/Dropdown';
import { DeleteButton } from '../Button/DeleteButton';

export const SearchForm = ({ id, criteria, content, menuItems }: any) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Dropdown title='검색 조건' menuItems={menuItems} defaultValue={criteria} />
      <TextField id='outlined-basic' variant='outlined' type='search' defaultValue={content} />
      <DeleteButton id={id} />
    </Box>
  );
};
