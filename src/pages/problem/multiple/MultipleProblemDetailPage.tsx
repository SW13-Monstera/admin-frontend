import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import {
  IMultipleDetailResponseData,
  IMultipleUpdateRequest,
} from '../../../types/problem/multipleApi';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useQuery } from 'react-query';
import { ToggleButton } from '../../../components/Button/ToggleButton';

export const MultipleProblemDetailPage = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery(['multiple-problems'], getMultipleProblemDetailData, {
    refetchOnWindowFocus: false,
    enabled: true,
    onError: (e: Error) => {
      throw new Error(e.message);
    },
  });

  function getMultipleProblemDetailData() {
    if (!id) return;
    return multipleProblemApiWrapper.getMultipleProblemDetail({ problem_id: id }).then((res) => {
      return res;
    });
  }

  function handleProblemActivate() {
    if (!id || !data) return;

    const newData: IMultipleUpdateRequest = {
      ...data,
      isActive: !data.isActive,
      choices: data.choiceData,
    };

    if (newData.hasOwnProperty('choiceData')) {
      delete newData.choiceData;
    }

    multipleProblemApiWrapper
      .updateMultipleProblem(id, newData as IMultipleUpdateRequest)
      .then(() => {
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
      <Box sx={{ mt: 2 }}>
        {data?.choiceData.map((choice, idx) => (
          <Box key={choice.content + idx} sx={{ display: 'flex', alignItems: 'center' }}>
            {choice.isAnswer ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            {choice.content}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>{data?.score}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToggleButton data={data} onClick={handleProblemActivate} />
        <Link to={URLWithParam.MULTIPLE_PROBLEM_EDIT(id!)}>
          <Button variant='contained'>수정</Button>
        </Link>
      </Box>
    </PageTemplate>
  );
};
