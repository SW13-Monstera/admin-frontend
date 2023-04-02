import { URL, URLWithParam } from '../../../constants/url';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';
import { useFilter } from '../../../hooks/useFilter';
import { useTable } from '../../../hooks/useTable';
import { ProblemListPageTemplate } from '../ProblemListPageTemplate';
import { problemSetTableHeads, shortTableHeads } from '../../../constants/tableHeads';
import { useQuery } from 'react-query';
import { IShortProblemListResponse } from '../../../types/problem/shortApi';
import { useTableParams } from '../../../hooks/useTableParams';
import { IProblemListRequest } from '../../../types/problem/api';
import PageTemplate from '../../../templates/PageTemplate';
import { Box, Button, Typography } from '@mui/material';
import { Appbar } from '../../../components/FormGroup/Appbar';
import { Link } from 'react-router-dom';
import { BaseTable } from '../../../components/Table/BaseTable';
import { problemSetApiWrapper } from '../../../api/wrapper/problem/problemSetApiWrapper';

export const ProblemSetListPage = () => {
  const filterHandler = useFilter();
  const { page, handleChangePage, handleRowClick } = useTable(URLWithParam.SHORT_PROBLEM_DETAIL);
  const { data } = useQuery(['problemSetList'], problemSetApiWrapper.getProblemSet);

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
        <Typography>문제 세트</Typography>
        <Link to={URL.PROBLEM_SET_ADD}>
          <Button variant='contained' sx={{ height: '100%' }}>
            문제 세트 추가
          </Button>
        </Link>
      </Box>
      <BaseTable
        tableHeads={problemSetTableHeads}
        data={data}
        page={page}
        handleChangePage={handleChangePage}
        totalElements={data?.length}
        handleRowClick={handleRowClick}
      />
    </PageTemplate>
  );
};
