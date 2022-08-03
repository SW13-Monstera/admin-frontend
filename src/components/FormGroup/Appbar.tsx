import { Button, Box, Badge } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { usePopover } from '../../hooks/usePopover';
import { FilterPopover } from '../Modal/FilterPopover';
import { v4 as uuidv4 } from 'uuid';

const newSearchFormData: any = { criteria: '', content: '', id: uuidv4() };

interface IAppbar {
  children?: JSX.Element;
  menuItems: any[];
}

export const Appbar = ({ children, menuItems }: IAppbar) => {
  const { anchorEl, handleClick, handleClose } = usePopover();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        my: 1,
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Badge badgeContent={0} color='primary'>
          <Button variant='outlined' startIcon={<FilterAltIcon />} onClick={handleClick}>
            필터
          </Button>
          <FilterPopover
            anchorEl={anchorEl}
            handleClose={handleClose}
            menuItems={menuItems}
          ></FilterPopover>
        </Badge>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
