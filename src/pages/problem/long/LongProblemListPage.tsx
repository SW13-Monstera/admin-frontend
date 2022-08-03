import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import PageTemplate from '../../../templates/PageTemplate';
import { URL } from '../../../constants/url';
import { ProblemTable } from '../../../components/Table/ProblemTable';
import { ILongProblem } from '../../../types/problem/api';
import { HeadCell } from '../../../types/etc';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';

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
    id: 'avgKeywordScore',
    numeric: true,
    disablePadding: false,
    label: '평균 키워드 점수',
  },
  {
    id: 'avgContentScore',
    numeric: true,
    disablePadding: false,
    label: '평균 내용 점수',
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

const tableHeads: (keyof ILongProblem)[] = [
  'id',
  'title',
  'creator',
  'avgKeywordScore',
  'avgPromptScore',
  'userAnswerCnt',
  'isActive',
];

export const LongProblemListPage = () => {
  function getLongDataList(page: number) {
    return longProblemApiWrapper.getLongProblemList({ page: page });
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
        <Appbar menuItems={[]}>
          <Link to={URL.LONG_PROBLEM_ADD}>
            <Button variant='contained' sx={{ height: '100%' }}>
              문제 추가
            </Button>
          </Link>
        </Appbar>
      </Box>
      <ProblemTable tableHeads={tableHeads} headCells={headCells} getData={getLongDataList} />
    </PageTemplate>
  );
};
