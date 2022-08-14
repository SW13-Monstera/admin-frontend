import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { URL, URLWithParam } from '../../constants/url';
import { ICustomTable } from '../../types/etc';
import { PROBLEM_FILTER } from '../../constants/filter';
import { roundToSecondDigit } from '../../utils';
import { CustomTableToolbar } from './CustomToolbar';
import { CustomTableHead } from './CustomTableHead';
import { IProblemListElement } from '../../types/problem/api';

export function CustomTable({ headCells, tableHeads, getData, filterState }: ICustomTable) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const params = Object.fromEntries(
      new Map(
        filterState.map((filter) => [
          PROBLEM_FILTER.find((e) => filter.condition === e.value)?.value,
          filter.value,
        ]),
      ),
    );
    getData(page, params).then((res) => {
      setData(res.problems);
      setTotalElements(res.totalElements);
    });
  }, [page, filterState]);

  const handleRowClick = (id: string) => {
    if (location.pathname === URL.LONG_PROBLEM_LIST) {
      navigate(URLWithParam.LONG_PROBLEM_DETAIL(id));
    } else if (location.pathname === URL.SHORT_PROBLEM_LIST) {
      navigate(URLWithParam.SHORT_PROBLEM_DETAIL(id));
    } else if (location.pathname === URL.MULTIPLE_PROBLEM_LIST) {
      navigate(URLWithParam.MULTIPLE_PROBLEM_DETAIL(id));
    } else {
      navigate(URL.LOGIN);
    }
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
      <CustomTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='small'>
          <CustomTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data.length}
            headCells={headCells}
          />
          <TableBody>
            {data.map((row, index) => {
              const isItemSelected = isSelected(row.id.toString());
              const labelId = `Custom-table-checkbox-${index}`;

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
                    tableHeads.includes(key as keyof IProblemListElement) ? (
                      key === 'title' || key === 'problemTitle' ? (
                        <TableCell
                          align='center'
                          key={`${key}-${row.id}`}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => handleRowClick(row.id.toString())}
                        >
                          {row[key as keyof IProblemListElement] ?? 'N/A'}
                        </TableCell>
                      ) : (
                        <TableCell align='center' key={`${key}-${row.id}`}>
                          {typeof row[key as keyof IProblemListElement] === 'boolean' ? (
                            <Checkbox
                              disabled
                              checked={
                                row[key as keyof IProblemListElement].toString() === 'true'
                                  ? true
                                  : false
                              }
                            />
                          ) : typeof row[key as keyof IProblemListElement] === 'number' ? (
                            roundToSecondDigit(row[key as keyof IProblemListElement]) ?? 'N/A'
                          ) : (
                            row[key as keyof IProblemListElement] ?? 'N/A'
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
