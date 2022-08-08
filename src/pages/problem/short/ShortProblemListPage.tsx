import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appbar } from '../../../components/FormGroup/Appbar';
import PageTemplate from '../../../templates/PageTemplate';
import { URL } from '../../../constants/url';
import { ProblemTable } from '../../../components/Table/ProblemTable';
import { ILongProblem } from '../../../types/problem/api';
import { HeadCell, IFilter, IProblemCondition } from '../../../types/etc';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { useState, MouseEvent, useEffect, ChangeEvent, useCallback } from 'react';
import { PROBLEM_FILTER } from '../../../constants/filter';
import { v4 as uuidv4 } from 'uuid';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';
import { useFilter } from '../../../hooks/useFilter';
import { ShortProblemTable } from '../../../components/Table/ShortProblemTable';
import { IShortProblemListElement } from '../../../types/problem/shortApi';

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

export const ShortProblemListPage = () => {
  const { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue } = useFilter();

  function getShortProblemList(page: number, params: object) {
    return shortProblemApiWrapper.getShortProblemList({ ...params, page: page });
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
        <Typography>단답형 문제</Typography>
        <Appbar
          menuItems={PROBLEM_FILTER}
          conditions={filterState}
          filterCount={filterState.length}
          addFilter={addFilter}
          deleteFilter={deletetFilter}
          updateCondition={updateCondition}
          updateFilterValue={updateFilterValue}
        >
          <Link to={URL.SHORT_PROBLEM_ADD}>
            <Button variant='contained' sx={{ height: '100%' }}>
              문제 추가
            </Button>
          </Link>
        </Appbar>
      </Box>
      <ShortProblemTable
        tableHeads={tableHeads}
        headCells={headCells}
        getData={getShortProblemList}
        filterState={filterState}
      />
    </PageTemplate>
  );
};
