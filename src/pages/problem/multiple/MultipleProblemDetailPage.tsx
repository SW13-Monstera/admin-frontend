import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import { IMultipleDetailResponseData } from '../../../types/problem/multipleApi';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const MultipleProblemDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<IMultipleDetailResponseData | null>(null);

  function editProblem() {}

  useEffect(() => {
    if (!id) return;
    multipleProblemApiWrapper.getMultipleProblemDetail({ problem_id: id }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <PageTemplate>
      <Typography variant='h4'>{data?.title}</Typography>
      <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
        {data?.tags.map((id) => (
          <Box key={id}>{TAGS.find((e) => e.id === id)?.name}</Box>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>{data?.description}</Box>
      <Box sx={{ mt: 2 }}>
        {data?.choiceData.map((choice) => (
          <Box>
            {choice.isAnswer ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            {choice.content}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>{data?.score}</Box>
      <Link to={URLWithParam.MUTIPLE_PROBLEM_EDIT(id!)}>
        <Button variant='contained'>수정</Button>
      </Link>
    </PageTemplate>
  );
};
