import PageTemplate from '../../../templates/PageTemplate';
import { Button, Box, Typography } from '@mui/material';
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
    id: 'problemTitle',
    name: '문제 제목',
  },
  {
    id: 'assignedUsername',
    name: '담당자',
  },
  {
    id: 'updatedAt',
    name: '완료된 시간',
  },
];

export const ValidatingDataListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();
  const { page, data, setData, totalElements, setTotalElements, handleChangePage, handleRowClick } =
    useTable(getValidatingDataList, filterState, URLWithParam.DATA_VALIDATING);

  function getValidatingDataList(page?: number) {
    dataApiWrapper.getDataList({ page: page, isLabeled: true, isValidated: false }).then((res) => {
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
          <Link to={'/data/labeling/0'}>
            <Button variant='outlined'>전체 검수 시작</Button>
          </Link>
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
