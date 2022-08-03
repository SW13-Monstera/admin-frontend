import PageTemplate from '../../../templates/PageTemplate';
import { DataTable } from '../../../components/Table/DataTable';
import { Input, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataListElement } from '../../../types/data/api';
import { HeadCell } from '../../../types/etc';

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
  function getLabelingDataList(page: number) {
    return dataApiWrapper.getDataList({ page: page, isLabeled: false, isValidated: false });
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
        <Appbar menuItems={[]}>
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
