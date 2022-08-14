import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import PageTemplate from '../../../templates/PageTemplate';
import { URL } from '../../../constants/url';
import { HeadCell } from '../../../types/etc';
import { PROBLEM_FILTER } from '../../../constants/filter';
import { useFilter } from '../../../hooks/useFilter';
import { IShortProblemListElement } from '../../../types/problem/shortApi';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import { CustomTable } from '../../../components/Table/CustomTable';

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Problem ID',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: '문제 제목',
  },
  {
    id: 'creator',
    numeric: false,
    disablePadding: false,
    label: '제작자',
  },
  {
    id: 'answerRate',
    numeric: true,
    disablePadding: false,
    label: '정답률',
  },

  {
    id: 'ansNum',
    numeric: true,
    disablePadding: false,
    label: '답변 수',
  },
  {
    id: 'isActive',
    numeric: true,
    disablePadding: false,
    label: '활성화 여부',
  },
];

const tableHeads: (keyof IShortProblemListElement)[] = [
  'id',
  'title',
  'creator',
  'answerRate',
  'userAnswerCnt',
  'isActive',
];

export const MultipleProblemListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();

  function getMultipleProblemList(page: number, params: object) {
    return multipleProblemApiWrapper.getMultipleProblemList({ ...params, page: page });
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
        <Typography>객관식 문제</Typography>
        <Appbar
          menuItems={PROBLEM_FILTER}
          conditions={filterState}
          filterCount={filterState.length}
          addFilter={addFilter}
          deleteFilter={deletetFilter}
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
      <CustomTable
        tableHeads={tableHeads}
        headCells={headCells}
        getData={getMultipleProblemList}
        filterState={filterState}
      />
    </PageTemplate>
  );
};
