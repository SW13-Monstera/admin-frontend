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
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { URL } from '../../../constants/url';
import { Link } from 'react-router-dom';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import { IChoiceElement, IMultipleCreateRequest } from '../../../types/problem/multipleApi';
import { CheckboxFormGroup } from '../../../components/FormGroup/CheckboxFormGroup';
import { DeleteButton } from '../../../components/Button/DeleteButton';
import { useChoice } from '../../../hooks/useChoice';

export const MultipleProblemAddPage = () => {
  const [tagState, setTagState] = useState(
    TAGS.map((tag) => {
      return { id: tag.id, isChecked: false };
    }),
  );
  const { choiceState, addChoice, deleteChoice } = useChoice();

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setTagState((prev) => [
      ...prev.map((e) => (e.id !== id ? e : { id: id, isChecked: !e.isChecked })),
    ]);
  };

  function getChoicesValue() {
    const choiceElement: IChoiceElement = { isAnswer: false, content: '' };
    const choiceInputs = document.querySelectorAll('#choices input');

    const choices: IChoiceElement[] = [];
    choiceInputs.forEach((input, idx) => {
      if (idx % 2 === 0) {
        choices.push({ isAnswer: (input as HTMLInputElement).checked, content: '' });
        console.log(choices);
      } else {
        choices[choices.length - 1].content = (input as HTMLInputElement).value;
      }
    });
    return choices;
  }

  function createProblem() {
    const data: IMultipleCreateRequest = {
      title: (document.getElementById('title') as HTMLTextAreaElement).value || '',
      description: (document.getElementById('desc') as HTMLTextAreaElement).value || '',
      tags: tagState.filter((tag) => tag.isChecked).map((e) => e.id),
      choices: getChoicesValue(),
      score: parseInt((document.getElementById('score') as HTMLTextAreaElement).value) || 0,
    };
    console.log(getChoicesValue());
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
          id='choices'
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            borderColor: '#0000003B',
            width: '100%',
          }}
        >
          {choiceState.map((choice) => (
            <Box
              key={choice.id}
              sx={{
                display: 'flex',
                px: 1,
              }}
            >
              <CheckboxFormGroup />
              <DeleteButton id={choice.id.toString()} onClick={deleteChoice} />
            </Box>
          ))}
          <Button variant='contained' sx={{ m: 2 }} onClick={addChoice}>
            추가
          </Button>
        </Card>
        <TextField
          id='score'
          label='점수'
          type='number'
          sx={{ my: 2 }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Link to={URL.MULTIPLE_PROBLEM_LIST}>
        <Button variant='contained' sx={{ mt: 2 }} onClick={createProblem}>
          저장
        </Button>
      </Link>
    </PageTemplate>
  );
};
