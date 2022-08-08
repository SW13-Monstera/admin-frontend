import PageTemplate from '../../../templates/PageTemplate';
import { DataTable } from '../../../components/Table/DataTable';
import { Box, Typography } from '@mui/material';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataListElement } from '../../../types/data/api';
import { HeadCell, IFilter } from '../../../types/etc';
import { DATA_FILTER } from '../../../constants/filter';
import { useState, MouseEvent, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFilter } from '../../../hooks/useFilter';

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
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();

  function getLabelingDataList(page: number) {
    return dataApiWrapper.getDataList({ page: page, isLabeled: true, isValidated: true });
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
        ></Appbar>
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
