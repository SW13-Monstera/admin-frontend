import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import PageTemplate from '../../../templates/PageTemplate';
import { URL, URLWithParam } from '../../../constants/url';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { PROBLEM_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';
import { BaseTable } from '../../../components/Table/BaseTable';
import { ITableHead } from '../../../types/etc';
import { useTable } from '../../../hooks/useTable';

const tableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'Problem ID',
  },
  {
    id: 'title',
    name: '문제 제목',
  },
  {
    id: 'creator',
    name: '제작자',
  },
  {
    id: 'avgKeywordScore',
    name: '평균 키워드 점수',
  },
  {
    id: 'avgPromptScore',
    name: '평균 내용 점수',
  },
  {
    id: 'userAnswerCnt',
    name: '답변 수',
  },
  {
    id: 'isActive',
    name: '활성화 여부',
  },
];

export const LongProblemListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();
  const { page, data, setData, totalElements, setTotalElements, handleChangePage, handleRowClick } =
    useTable(getLongDataList, filterState, URLWithParam.LONG_PROBLEM_DETAIL);

  function getLongDataList(page?: number, params?: object) {
    longProblemApiWrapper.getLongProblemList({ ...params, page: page }).then((res) => {
      setData(res.problems);
      setTotalElements(res.totalElements);
    });
  }

  return (
    <PageTemplate>
      <Typography>문제 관리</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 1,
          gap: 1,
        }}
      >
        <Typography>서술형 문제</Typography>
        <Appbar
          menuItems={PROBLEM_FILTER}
          conditions={filterState}
          filterCount={filterState.length}
          addFilter={addFilter}
          deleteFilter={deletetFilter}
          updateCondition={updateCondition}
          updateFilterValue={updateFilterValue}
        >
          <Link to={URL.LONG_PROBLEM_ADD}>
            <Button variant='contained' sx={{ height: '100%' }}>
              문제 추가
            </Button>
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
