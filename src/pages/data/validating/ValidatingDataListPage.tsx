import PageTemplate from '../../../templates/PageTemplate';
import { DataTable } from '../../../components/Table/DataTable';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataListElement } from '../../../types/data/api';
import { HeadCell, IFilter } from '../../../types/etc';
import { useState, MouseEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DATA_FILTER } from '../../../constants/filter';

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Data ID',
  },
  {
    id: 'problemTitle',
    numeric: false,
    disablePadding: false,
    label: '문제 제목',
  },
  {
    id: 'assignedUsername',
    numeric: false,
    disablePadding: false,
    label: '담당자',
  },
  {
    id: 'updatedAt',
    numeric: false,
    disablePadding: false,
    label: '완료된 시간',
  },
];

const tableHeads: (keyof IDataListElement)[] = [
  'id',
  'problemTitle',
  'assignedUsername',
  'updatedAt',
];

export const ValidatingDataListPage = () => {
  const [filterState, setFilterState] = useState<IFilter[]>([]);
  function getValidatingDataList(page: number) {
    return dataApiWrapper.getDataList({ page: page, isLabeled: true, isValidated: false });
  }
  function addFilter() {
    setFilterState((prev) => [...prev, { id: uuidv4(), condition: '', value: '' }]);
  }
  function deletetFilter(event: MouseEvent<Element, MouseEvent>) {
    const id = event.currentTarget.id;
    setFilterState((prev) => prev.filter((e) => e.id !== id));
  }
  function updateCondition(event: MouseEvent<Element, MouseEvent>) {}
  function updateFilterValue(event: MouseEvent<Element, MouseEvent>) {}
  return (
    <PageTemplate>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 1,
          gap: 1,
        }}
      >
        <Typography>AI 데이터 리스트</Typography>
        <Appbar
          menuItems={DATA_FILTER}
          conditions={filterState}
          filterCount={filterState.length}
          addFilter={addFilter}
          deleteFilter={deletetFilter}
          updateCondition={updateCondition}
          updateFilterValue={updateFilterValue}
        >
          <Link to={'/data/labeling/0'}>
            <Button variant='outlined'>전체 검수 시작</Button>
          </Link>
        </Appbar>
      </Box>
      <DataTable tableHeads={tableHeads} headCells={headCells} getData={getValidatingDataList} />
    </PageTemplate>
  );
};
