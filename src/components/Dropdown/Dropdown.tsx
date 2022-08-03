import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IMenuItem {
  value: string;
  name: string;
}

interface IDropdown {
  title: string;
  menuItems: IMenuItem[];
  defaultValue?: string;
}

export default function Dropdown({ title, menuItems, defaultValue }: IDropdown) {
  const [selectedItem, setselectedItem] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setselectedItem(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{title}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedItem}
          label='search-criteria'
          onChange={handleChange}
          defaultValue={defaultValue}
        >
          {menuItems.map((menuItem) => (
            <MenuItem value={menuItem.value} key={menuItem.value}>
              {menuItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
