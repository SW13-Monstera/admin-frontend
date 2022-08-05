import PageTemplate from '../../../templates/PageTemplate';
import { DataTable } from '../../../components/Table/DataTable';
import { Input, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataListElement } from '../../../types/data/api';
import { HeadCell, IFilter } from '../../../types/etc';
import { useState, MouseEvent, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DATA_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Data ID',
  },
  {
    id: 'title',
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
    label: '생성 시간',
  },
];

const tableHeads: (keyof IDataListElement)[] = [
  'id',
  'problemTitle',
  'assignedUsername',
  'updatedAt',
];

export const LabelingDataListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();

  function getLabelingDataList(page: number, params: object) {
    console.log({
      ...params,
      page: page,
      isLabeled: false,
      isValidated: false,
    });
    return dataApiWrapper.getDataList({
      ...params,
      page: page,
      isLabeled: false,
      isValidated: false,
    });
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
      <DataTable
        tableHeads={tableHeads}
        headCells={headCells}
        getData={getLabelingDataList}
        filterState={filterState}
      />
    </PageTemplate>
  );
};
