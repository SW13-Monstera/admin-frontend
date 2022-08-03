import { Popover, Box } from '@mui/material';
import { SearchForm } from '../FormGroup/SearchForm';
import { AddButton } from '../Button/AddButton';

interface IFilterPopover {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  menuItems: any[];
}

export const FilterPopover = ({ anchorEl, handleClose, menuItems }: IFilterPopover) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{ mt: 1 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 5 }}>
        {[].map((e: any) => (
          <SearchForm
            id={e.id}
            criteria={e.criteria}
            content={e.content}
            menuItems={menuItems}
            key={e.id}
          />
        ))}
        <AddButton onClick={() => {}} />
      </Box>
    </Popover>
  );
};
