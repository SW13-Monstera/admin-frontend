import PageTemplate from '../../../templates/PageTemplate';
import { DataTable } from '../../../components/Table/DataTable';
import { Input, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataListElement } from '../../../types/data/api';
import { HeadCell, IFilter } from '../../../types/etc';
import { DATA_FILTER } from '../../../constants/filter';
import { v4 as uuidv4 } from 'uuid';
import { useState, MouseEvent, ChangeEvent } from 'react';

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
    id: 'validatingUsername',
    numeric: false,
    disablePadding: false,
    label: '검수자',
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
  'validatingUsername',
  'assignedUsername',
  'updatedAt',
];

export const DoneDataListPage = () => {
  const [filterState, setFilterState] = useState<IFilter[]>([]);
  function getLabelingDataList(page: number) {
    return dataApiWrapper.getDataList({ page: page, isLabeled: true, isValidated: true });
  }
  function addFilter() {
    setFilterState((prev) => [...prev, { id: uuidv4(), condition: 'id', value: '' }]);
  }
  function deletetFilter(event: MouseEvent<Element, MouseEvent>) {
    const id = event.currentTarget.id;
    setFilterState((prev) => prev.filter((e) => e.id !== id));
  }
  function updateCondition(newCondition: string, DOMId: string) {
    setFilterState((prev) =>
      prev.map(({ id, condition, value }) =>
        id === DOMId
          ? ({ id, value, condition: newCondition } as unknown as IFilter)
          : { id, condition, value },
      ),
    );
  }
  function updateFilterValue(event: ChangeEvent<HTMLTextAreaElement>) {
    if (!event.currentTarget) return;
    const DOMId = event.currentTarget.id;
    const DOMValue = event.currentTarget.value;
    setFilterState((prev) =>
      prev.map(({ id, condition, value }) =>
        id === DOMId ? { id, value: DOMValue, condition } : { id, condition, value },
      ),
    );
  }

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
          <>
            <label htmlFor='upload-csv'>
              <Input type='file' style={{ display: 'none' }} id='upload-csv' name='upload-csv' />
              <Button variant='outlined' color='secondary' component='span'>
                csv 파일 불러오기
              </Button>
            </label>
            <Link to={'/data/labeling/0'}>
              <Button variant='outlined'>전체 라벨링 시작</Button>
            </Link>
          </>
        </Appbar>
      </Box>
      <DataTable tableHeads={tableHeads} headCells={headCells} getData={getLabelingDataList} />
    </PageTemplate>
  );
};
