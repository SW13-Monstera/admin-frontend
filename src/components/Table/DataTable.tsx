import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import FilterIcon from '@mui/icons-material/FilterAltRounded';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IDataListElement } from '../../types/data/api';
import { URLWithParam } from '../../constants/url';
import { HeadCell } from '../../types/etc';

interface EnhancedTableProps {
  numSelected: number;
  rowCount: number;
  headCells: readonly HeadCell[];
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
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

const EnhancedTableToolbar = (props: { numSelected: any }) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
        {numSelected} selected
      </Typography>
      <Tooltip title='Filter'>
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

interface ICustomTable {
  tableHeads: (keyof IDataListElement)[];
  headCells: readonly HeadCell[];
  getData: (page: number) => Promise<any>;
}

export function DataTable({ headCells, tableHeads, getData }: ICustomTable) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [data, setData] = useState<IDataListElement[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getData(page).then((res) => {
      setData(res.userAnswers);
      setTotalElements(res.totalElements);
    });
  }, []);

  const handleRowClick = (id: string) => {
    navigate(URLWithParam.LONG_PROBLEM_DETAIL(id));
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id.toString());
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id.toString());
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id.toString());
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>총 개수 {totalElements}개</Typography>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='small'>
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data.length}
            headCells={headCells}
          />
          <TableBody>
            {data.map((row, index) => {
              const isItemSelected = isSelected(row.id.toString());
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      onClick={(event: MouseEvent<unknown>) =>
                        handleClick(event, row.id.toString())
                      }
                    />
                  </TableCell>
                  {Object.keys(row).map((key) =>
                    tableHeads.includes(key as keyof IDataListElement) ? (
                      key === 'title' || key === 'problemTitle' ? (
                        <TableCell
                          align='center'
                          key={key}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => handleRowClick(row.id.toString())}
                        >
                          {row[key as keyof IDataListElement] ?? 'N/A'}
                        </TableCell>
                      ) : (
                        <TableCell align='center' key={uuidv4()}>
                          {typeof row[key as keyof IDataListElement] === 'boolean' ? (
                            <Checkbox
                              disabled
                              checked={
                                row[key as keyof IDataListElement].toString() === 'true'
                                  ? true
                                  : false
                              }
                            />
                          ) : (
                            row[key as keyof IDataListElement] ?? 'N/A'
                          )}
                        </TableCell>
                      )
                    ) : (
                      ''
                    ),
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={totalElements}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}
