import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import { IShortProblemDetailResponse } from '../../../types/problem/shortApi';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';
import { ToggleButton } from '../../../components/Button/ToggleButton';
import { useQuery } from 'react-query';

export const ShortProblemDetailPage = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery(['short-problems'], getShortProblemDetailData, {
    refetchOnWindowFocus: false,
    enabled: true,
    onError: (e: Error) => {
      throw new Error(e.message);
    },
  });

  function getShortProblemDetailData() {
    if (!id) return;
    return shortProblemApiWrapper.getShortProblemDetail({ problem_id: id }).then((res) => {
      return res;
    });
  }

  function handleProblemActivate() {
    if (!id || !data) return;
    const newData: IShortProblemDetailResponse = { ...data, isActive: !data.isActive };
    shortProblemApiWrapper.updateShortProblem(id, newData).then(() => {
      refetch();
    });
  }

  return (
    <PageTemplate>
      <Typography variant='h4'>{data?.title}</Typography>
      <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
        {data?.tags.map((id) => (
          <Box key={id}>{TAGS.find((e) => e.id === id)?.name}</Box>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>{data?.description}</Box>
      <Box sx={{ mt: 2 }}>{data?.answer}</Box>
      <Box sx={{ mt: 2 }}>{data?.score}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButton data={data} onClick={handleProblemActivate} />
        <Link to={URLWithParam.SHORT_PROBLEM_EDIT(id!)}>
          <Button variant='contained'>수정</Button>
        </Link>
      </Box>
    </PageTemplate>
  );
};
