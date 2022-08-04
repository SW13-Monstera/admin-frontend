import PageTemplate from '../../../templates/PageTemplate';
import {
  Box,
  TextField,
  Divider,
  Button,
  Card,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { TextNumberInput } from '../../../components/FormGroup/TextNumberInput';
import { TAGS } from '../../../constants/tags';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { IProblemCreateData, IStandard, IStandardResponse } from '../../../types/problem/api';
import { STANDARD_TYPE } from '../../../constants/standard';
import { useState, ChangeEvent, useEffect } from 'react';
import { URL } from '../../../constants/url';
import { Link } from 'react-router-dom';

export const LongProblemAddPage = () => {
  const [tagState, setTagState] = useState(
    TAGS.map((tag) => {
      return { id: tag.id, isChecked: false };
    }),
  );
  const [standardState, setStandardState] = useState<IStandardResponse[]>([
    { content: '', score: 0, id: 0, type: STANDARD_TYPE.KEYWORD },
    { content: '', score: 0, id: 1, type: STANDARD_TYPE.CONTENT },
  ]);

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setTagState((prev) => [
      ...prev.map((e) => (e.id !== id ? e : { id: id, isChecked: !e.isChecked })),
    ]);
  };

  const handleStandardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.type === 'text') {
      console.log(target.id);
      setStandardState((prev) =>
        prev.map((standard) =>
          standard.id.toString() === target.id.replace('text-', '')
            ? { id: standard.id, score: standard.score, content: target.value, type: standard.type }
            : standard,
        ),
      );
    } else if (target.type === 'number') {
      setStandardState((prev) =>
        prev.map((standard) =>
          standard.id.toString() === target.id.replace('number-', '')
            ? {
                id: standard.id,
                score: parseFloat(target.value) || 0,
                content: standard.content,
                type: standard.type,
              }
            : standard,
        ),
      );
    } else {
      return;
    }
  };

  function createProblem() {
    const data: IProblemCreateData = {
      title: (document.getElementById('title') as HTMLTextAreaElement).value || '',
      description: (document.getElementById('desc') as HTMLTextAreaElement).value || '',
      standardAnswer:
        (document.getElementById('standardAnswer') as HTMLTextAreaElement).value || '',
      tags: tagState.filter((tag) => tag.isChecked).map((e) => e.id),
      gradingStandards: standardState.map(({ content, score, type }) => {
        return { content, score, type };
      }),
    };
    longProblemApiWrapper.createLongProblem(data);
  }

  useEffect(() => {
    console.log(standardState);
  }, [standardState]);

  return (
    <PageTemplate>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField id='title' label='문제 제목' variant='outlined' sx={{ my: 2 }} />
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
                        onChange={handleTagChange}
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
        <TextField id='desc' label='문제 설명' multiline rows={4} sx={{ my: 2 }} />
        <TextField id='standardAnswer' label='모범 답안' multiline rows={4} sx={{ my: 2 }} />
        <Divider sx={{ my: 2 }} />
        <Typography>키워드 채점 기준</Typography>
        {standardState
          .filter((e) => e.type === STANDARD_TYPE.KEYWORD)
          .map(({ content, score, id }) => (
            <TextNumberInput
              text={content}
              number={score}
              id={id.toString()}
              key={id}
              onChange={handleStandardChange}
            />
          ))}
        <Divider sx={{ my: 2 }} />
        <Typography>내용 채점 기준</Typography>
        {standardState
          .filter((e) => e.type === STANDARD_TYPE.CONTENT)
          .map(({ content, score, id }) => (
            <TextNumberInput
              text={content}
              number={score}
              id={id.toString()}
              key={id}
              onChange={handleStandardChange}
            />
          ))}
      </Box>
      <Link to={URL.LONG_PROBLEM_LIST}>
        <Button variant='contained' sx={{ mt: 2 }} onClick={createProblem}>
          저장
        </Button>
      </Link>
    </PageTemplate>
  );
};
