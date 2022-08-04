import PageTemplate from '../../../templates/PageTemplate';
import {
  Box,
  TextField,
  Divider,
  Button,
  Card,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { TextNumberInput } from '../../../components/FormGroup/TextNumberInput';
import { TAGS } from '../../../constants/tags';
import { useDialog } from '../../../hooks/useDialog';
import { WarningDialog } from '../../../components/Dialog/WarningDialog';
import { useState, useEffect } from 'react';
import { IProblemCreateData, IProblemDetailResponse } from '../../../types/problem/api';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { STANDARD_TYPE } from '../../../constants/standard';

export const LongProblemEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<IProblemDetailResponse>({
    id: 0,
    title: '',
    description: '',
    standardAnswer: '',
    tags: [],
    gradingStandards: [],
  });
  const [tagState, setTagState] = useState(
    TAGS.map((tag) => {
      return { id: tag.id, isChecked: false };
    }),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setTagState((prev) => [
      ...prev.map((e) => (e.id !== id ? e : { id: id, isChecked: !e.isChecked })),
    ]);
  };

  if (!id) return;

  useEffect(() => {
    longProblemApiWrapper.getLongProblemDetail({ problem_id: parseInt(id) }).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    setTagState(
      TAGS.map((tag) => {
        return { id: tag.id, isChecked: data.tags.includes(tag.id) };
      }),
    );
  }, [data]);

  function editProblem() {
    if (!id) return;
    const data: IProblemCreateData = {
      title: (document.getElementById('title') as HTMLTextAreaElement).value || '',
      description: (document.getElementById('desc') as HTMLTextAreaElement).value || '',
      standardAnswer:
        (document.getElementById('standardAnswer') as HTMLTextAreaElement).value || '',
      tags: tagState.filter((tag) => tag.isChecked).map((e) => e.id),
      gradingStandards: [
        {
          content: 'keyword-1',
          score: 1.0,
          type: 'KEYWORD',
        },
        {
          content: 'prompt-1',
          score: 2.0,
          type: 'PROMPT',
        },
      ],
    };
    longProblemApiWrapper.updateLongProblem(parseInt(id), data);
  }

  const { isDialogOpen, handleDialogOpen, handleDialogClose } = useDialog();

  return (
    <PageTemplate>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          id='title'
          label='문제 제목'
          multiline
          defaultValue={data.title}
          sx={{ my: 2 }}
        />
        <Card variant='outlined' sx={{ backgroundColor: 'transparent', borderColor: '#0000003B' }}>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ my: 3 }} component='fieldset' variant='standard'>
              <FormGroup aria-label='tag choices' row>
                {TAGS.map((tag) => (
                  <FormControlLabel
                    labelPlacement='top'
                    control={
                      <Checkbox
                        checked={tagState.find((e) => e.id === tag.id)?.isChecked}
                        onChange={handleChange}
                        name={tag.name}
                        id={tag.id}
                      />
                    }
                    label={tag.name}
                    key={tag.id}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Card>
        <TextField
          id='desc'
          label='문제 설명'
          multiline
          defaultValue={data.description}
          sx={{ my: 2 }}
        />
        <TextField
          id='standardAnswer'
          label='모범 답안'
          multiline
          defaultValue={data.standardAnswer}
          sx={{ my: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        <Typography>키워드 채점 기준</Typography>
        {data.gradingStandards
          .filter((e) => e.type === STANDARD_TYPE.KEYWORD)
          .map((keyword) => (
            <TextNumberInput
              text={keyword.content}
              number={keyword.score}
              id={keyword.id.toString()}
              key={keyword.id}
            />
          ))}
        <Divider sx={{ my: 2 }} />
        <Typography>내용 채점 기준</Typography>
        {data.gradingStandards
          .filter((e) => e.type === STANDARD_TYPE.KEYWORD)
          .map((content) => (
            <TextNumberInput
              text={content.content}
              number={content.score}
              id={content.id.toString()}
              key={content.id}
            />
          ))}
      </Box>
      <Button variant='contained' sx={{ mt: 2 }} onClick={handleDialogOpen}>
        수정
      </Button>
      <WarningDialog isOpen={isDialogOpen} handleClose={handleDialogClose} onClick={editProblem} />
    </PageTemplate>
  );
};
