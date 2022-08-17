import PageTemplate from '../../../templates/PageTemplate';
import { Input, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { ITableHead } from '../../../types/etc';
import { DATA_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';
import { useTable } from '../../../hooks/useTable';
import { BaseTable } from '../../../components/Table/BaseTable';
import { URLWithParam } from '../../../constants/url';

const tableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'Data ID',
  },
  {
    id: 'title',
    name: '문제 제목',
  },
  {
    id: 'assignedUsername',
    name: '담당자',
  },
  {
    id: 'updatedAt',
    name: '생성 시간',
  },
];

export const LabelingDataListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();
  const { page, data, setData, totalElements, setTotalElements, handleChangePage, handleRowClick } =
    useTable(getLabelingDataList, filterState, URLWithParam.DATA_LABELING);

  function getLabelingDataList(page?: number, params?: object) {
    dataApiWrapper
      .getDataList({
        ...params,
        page: page,
        isLabeled: false,
        isValidated: false,
      })
      .then((res) => {
        setData(res.userAnswers);
        setTotalElements(res.totalElements);
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
      <BaseTable
        tableHeads={tableHeads}
        data={data}
        page={page}
        handleChangePage={handleChangePage}
        totalElements={totalElements}
        handleRowClick={handleRowClick}
      />
    </PageTemplate>
  );
};
