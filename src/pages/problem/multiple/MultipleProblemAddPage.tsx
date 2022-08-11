import PageTemplate from '../../../templates/PageTemplate';
import {
  Box,
  TextField,
  Button,
  Card,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { TAGS } from '../../../constants/tags';
import { useState, ChangeEvent } from 'react';
import { URL } from '../../../constants/url';
import { Link } from 'react-router-dom';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import { IChoiceElement, IMultipleCreateRequest } from '../../../types/problem/multipleApi';
import { CheckboxFormGroup } from '../../../components/FormGroup/CheckboxFormGroup';

export const MultipleProblemAddPage = () => {
  const [tagState, setTagState] = useState(
    TAGS.map((tag) => {
      return { id: tag.id, isChecked: false };
    }),
  );
  const [choiceState, useChoiceState] = useState<IChoiceElement[]>([
    { isAnswer: false, content: '' },
  ]);

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setTagState((prev) => [
      ...prev.map((e) => (e.id !== id ? e : { id: id, isChecked: !e.isChecked })),
    ]);
  };

  function createProblem() {
    const data: IMultipleCreateRequest = {
      title: (document.getElementById('title') as HTMLTextAreaElement).value || '',
      description: (document.getElementById('desc') as HTMLTextAreaElement).value || '',
      tags: tagState.filter((tag) => tag.isChecked).map((e) => e.id),
      choices: [],
      score: parseInt((document.getElementById('score') as HTMLTextAreaElement).value) || 0,
    };
    multipleProblemApiWrapper.createMultipleProblem(data);
  }

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
          variant='outlined'
          sx={{ my: 2 }}
          InputLabelProps={{ shrink: true }}
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
        <TextField
          id='desc'
          label='문제 설명'
          multiline
          rows={4}
          sx={{ my: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <Typography sx={{ fontSize: '1rem' }}>선택지</Typography>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            backgroundColor: 'transparent',
            borderColor: '#0000003B',
            width: '100%',
          }}
        >
          {choiceState.map((choice) => (
            <CheckboxFormGroup
              isChecked={choice.isAnswer}
              text={choice.content}
              key={choice.content}
            />
          ))}
        </Card>
        <TextField
          id='score'
          label='점수'
          type='number'
          sx={{ my: 2 }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Link to={URL.MUTILPLE_PROBLEM_LIST}>
        <Button variant='contained' sx={{ mt: 2 }} onClick={createProblem}>
          저장
        </Button>
      </Link>
    </PageTemplate>
  );
};
