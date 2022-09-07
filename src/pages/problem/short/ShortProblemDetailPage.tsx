import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import { IShortProblemDetailResponse } from '../../../types/problem/shortApi';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';
import { ActivationToggleButton } from '../../../components/Button/ActivationToggleButton';
import { useMutation, useQuery } from 'react-query';

interface IUpdateShortProblemDetail {
  id: string;
  data: IShortProblemDetailResponse;
}

export const ShortProblemDetailPage = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery(
    ['short-problem-detail', id],
    () => shortProblemApiWrapper.getShortProblemDetail({ problem_id: id ?? '' }),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    },
  );

  const { mutate } = useMutation(
    ({ id, data }: IUpdateShortProblemDetail) => {
      return shortProblemApiWrapper.updateShortProblem(id, data);
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  function handleProblemActivate() {
    if (!id || !data) return;
    const newData: IShortProblemDetailResponse = { ...data, isActive: !data.isActive };
    mutate({ id, data: newData });
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
        <ActivationToggleButton data={data} onClick={handleProblemActivate} />
        <Link to={URLWithParam.SHORT_PROBLEM_EDIT(id!)}>
          <Button variant='contained'>수정</Button>
        </Link>
      </Box>
    </PageTemplate>
  );
};
