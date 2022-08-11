import { ChangeEvent } from 'react';
import { TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import { HeadCell } from '../../types/etc';

interface EnhancedTableProps {
  numSelected: number;
  rowCount: number;
  headCells: readonly HeadCell[];
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
