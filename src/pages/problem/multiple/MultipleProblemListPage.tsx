import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import PageTemplate from '../../../templates/PageTemplate';
import { URL, URLWithParam } from '../../../constants/url';
import { ITableHead } from '../../../types/etc';
import { PROBLEM_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import { BaseTable } from '../../../components/Table/BaseTable';
import { useTable } from '../../../hooks/useTable';
import { useQuery } from 'react-query';
import { IProblemListData } from '../../../types/problem/api';

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
    id: 'answerRate',
    name: '정답률',
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

export const MultipleProblemListPage = () => {
  const { filterState, addFilter, deleteFilter, updateCondition, updateFilterValue } = useFilter();
  const { page, handleChangePage, handleRowClick, params } = useTable(
    filterState,
    URLWithParam.MULTIPLE_PROBLEM_DETAIL,
  );
  const { data } = useQuery<IProblemListData>(
    ['longProblemList', params],
    () => multipleProblemApiWrapper.getMultipleProblemList(params),
    { enabled: !!params },
  );

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
        <Typography>객관식 문제</Typography>
        <Appbar
          menuItems={PROBLEM_FILTER}
          conditions={filterState}
          filterCount={filterState.length}
          addFilter={addFilter}
          deleteFilter={deleteFilter}
          updateCondition={updateCondition}
          updateFilterValue={updateFilterValue}
        >
          <Link to={URL.MULTIPLE_PROBLEM_ADD}>
            <Button variant='contained' sx={{ height: '100%' }}>
              문제 추가
            </Button>
          </Link>
        </Appbar>
      </Box>
      <BaseTable
        tableHeads={tableHeads}
        data={data?.problems}
        page={page}
        handleChangePage={handleChangePage}
        totalElements={data?.totalElements}
        handleRowClick={handleRowClick}
      />
    </PageTemplate>
  );
};
