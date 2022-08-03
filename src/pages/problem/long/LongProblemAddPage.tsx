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
import { IProblemCreateData } from '../../../types/problem/api';
import { STANDARD_TYPE } from '../../../constants/standard';
import { useState } from 'react';

export const LongProblemAddPage = () => {
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

  function createProblem() {
    const data: IProblemCreateData = {
      title: (document.getElementById('title') as HTMLTextAreaElement).value || '',
      description: (document.getElementById('desc') as HTMLTextAreaElement).value || '',
      standardAnswer:
        (document.getElementById('standardAnswer') as HTMLTextAreaElement).value || '',
      tags: ['db', 'network'],
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
    longProblemApiWrapper.createLongProblem(data);
  }

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
        <TextField id='desc' label='문제 설명' multiline rows={4} sx={{ my: 2 }} />
        <TextField id='standardAnswer' label='모범 답안' multiline rows={4} sx={{ my: 2 }} />
        <Divider sx={{ my: 2 }} />
        <Typography>키워드 채점 기준</Typography>
        {[{ text: '', number: 0, id: '' }].map(({ text, number, id }) => (
          <TextNumberInput text={text} number={number} id={id} key={id} />
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography>내용 채점 기준</Typography>
        {[{ text: '', number: 0, id: '' }].map(({ text, number, id }) => (
          <TextNumberInput text={text} number={number} id={id} key={id} />
        ))}
      </Box>
      <Button variant='contained' sx={{ mt: 2 }} onClick={createProblem}>
        저장
      </Button>
    </PageTemplate>
  );
};
