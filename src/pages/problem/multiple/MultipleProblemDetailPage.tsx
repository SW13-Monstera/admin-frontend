import PageTemplate from '../../../templates/PageTemplate';
import { Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { URLWithParam } from '../../../constants/url';
import { TAGS } from '../../../constants/tags';
import { IMultipleUpdateRequest } from '../../../types/problem/multipleApi';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useMutation, useQuery } from 'react-query';
import { ToggleButton } from '../../../components/Button/ToggleButton';

interface IUpdateMultipleProblemDetail {
  id: string;
  data: IMultipleUpdateRequest;
}

export const MultipleProblemDetailPage = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery(['multiple-problems'], getMultipleProblemDetailData, {
    refetchOnWindowFocus: false,
    enabled: true,
    onError: (e: Error) => {
      throw new Error(e.message);
    },
  });
  const { mutate } = useMutation(
    ({ id, data }: IUpdateMultipleProblemDetail) => {
      return multipleProblemApiWrapper.updateMultipleProblem(id, data);
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

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

    delete newData.choiceData;
    delete newData.id;
    delete newData.isMultiple;

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
