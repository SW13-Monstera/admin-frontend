import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import { IShortProblemDetailResponse } from '../../../types/problem/shortApi';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';

export const ShortProblemDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<IShortProblemDetailResponse>({
    id: 0,
    title: '',
    description: '',
    answer: '',
    tags: [],
    score: 0,
  });

  function editProblem() {}

  useEffect(() => {
    if (!id) return;
    shortProblemApiWrapper.getShortProblemDetail({ problem_id: id }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <PageTemplate>
      <Typography variant='h4'>{data.title}</Typography>
      <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
        {data.tags.map((id) => (
          <Box key={id}>{TAGS.find((e) => e.id === id)?.name}</Box>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>{data.description}</Box>
      <Box sx={{ mt: 2 }}>{data.answer}</Box>
      <Box sx={{ mt: 2 }}>{data.score}</Box>
      <Link to={URLWithParam.SHORT_PROBLEM_EDIT(id!)}>
        <Button variant='contained'>수정</Button>
      </Link>
    </PageTemplate>
  );
};
