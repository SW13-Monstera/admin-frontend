import PageTemplate from '../../../templates/PageTemplate';
import { Box, Typography } from '@mui/material';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { ITableHead } from '../../../types/etc';
import { DATA_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';
import { BaseTable } from '../../../components/Table/BaseTable';
import { useTable } from '../../../hooks/useTable';
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
    id: 'validatingUsername',
    name: '검수자',
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

export const DoneDataListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();
  const { page, data, setData, totalElements, setTotalElements, handleChangePage, handleRowClick } =
    useTable(getDoneDataList, filterState, URLWithParam.DATA_DONE);

  function getDoneDataList(page?: number) {
    dataApiWrapper.getDataList({ page: page, isLabeled: true, isValidated: true }).then((res) => {
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
        ></Appbar>
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
