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
import { IDataListElement } from '../../types/data/api';
import { URL, URLWithParam } from '../../constants/url';
import { IDataTable } from '../../types/etc';
import { parseDateTime } from '../../utils';
import { CustomTableToolbar } from './CustomToolbar';
import { CustomTableHead } from './CustomTableHead';
import { DATA_FILTER } from '../../constants/filter';

export function DataTable({ headCells, tableHeads, getData, filterState }: IDataTable) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [data, setData] = useState<IDataListElement[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const params = Object.fromEntries(
      new Map(
        filterState.map((filter) => [
          DATA_FILTER.find((e) => filter.condition === e.value)?.value,
          filter.value,
        ]),
      ),
    );
    getData(page, params).then((res) => {
      setData(res.userAnswers);
      setTotalElements(res.totalElements);
    });
  }, [page, filterState]);

  const handleRowClick = (id: string) => {
    if (location.pathname === URL.LABELING_DATA_LIST) {
      navigate(URLWithParam.DATA_LABELING(id));
    } else if (location.pathname === URL.VALIDATING_DATA_LIST) {
      navigate(URLWithParam.DATA_VALIDATING(id));
    } else if (location.pathname === URL.DONE_DATA_LIST) {
      navigate(URLWithParam.DATA_DONE(id));
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
                    tableHeads.includes(key as keyof IDataListElement) ? (
                      key === 'problemTitle' ? (
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
                          {row[key as keyof IDataListElement] ?? 'N/A'}
                        </TableCell>
                      ) : (
                        <TableCell align='center' key={`${key}-${row.id}`}>
                          {typeof row[key as keyof IDataListElement] === 'boolean' ? (
                            <Checkbox
                              disabled
                              checked={
                                row[key as keyof IDataListElement].toString() === 'true'
                                  ? true
                                  : false
                              }
                            />
                          ) : key === 'updatedAt' ? (
                            parseDateTime(row[key as keyof IDataListElement].toString())
                          ) : (
                            row[key as keyof IDataListElement].toString() ?? 'N/A'
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
