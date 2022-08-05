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
import { Link, useParams } from 'react-router-dom';
import { TextNumberInput } from '../../../components/FormGroup/TextNumberInput';
import { TAGS } from '../../../constants/tags';
import { useDialog } from '../../../hooks/useDialog';
import { WarningDialog } from '../../../components/Dialog/WarningDialog';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  IProblemCreateData,
  IProblemDetailResponse,
  IStandardResponse,
} from '../../../types/problem/api';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { STANDARD_TYPE } from '../../../constants/standard';
import { URL } from '../../../constants/url';

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
  const [standardState, setStandardState] = useState<IStandardResponse[]>([]);

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
    setStandardState(data.gradingStandards);
  }, [data]);

  function editProblem() {
    if (!id) return;
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
      <Button variant='contained' sx={{ mt: 2 }} onClick={handleDialogOpen}>
        수정
      </Button>
      <WarningDialog isOpen={isDialogOpen} handleClose={handleDialogClose} onClick={editProblem} />
    </PageTemplate>
  );
};
