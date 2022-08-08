import PageTemplate from '../../../templates/PageTemplate';
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { URLWithParam } from '../../../constants/url';
import { IProblemDetailResponse, IProblemUpdateData } from '../../../types/problem/api';
import { STANDARD_TYPE } from '../../../constants/standard';
import { TAGS } from '../../../constants/tags';

export const LongProblemDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<IProblemDetailResponse>({
    id: 0,
    title: '',
    description: '',
    standardAnswer: '',
    tags: [],
    gradingStandards: [],
  });

  //추후 수정
  function handleProblemGradablility() {
    if (!id) return;
    const newData: IProblemUpdateData = { ...data, isGradable: false, isActive: false };
    longProblemApiWrapper.updateLongProblem(parseInt(id), newData);
  }

  //추후 수정
  function handleProblemActivate() {
    if (!id) return;
    const newData: IProblemUpdateData = { ...data, isGradable: false, isActive: false };
    longProblemApiWrapper.updateLongProblem(parseInt(id), newData);
  }

  useEffect(() => {
    if (!id) return;
    longProblemApiWrapper.getLongProblemDetail({ problem_id: parseInt(id) }).then((res) => {
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
      <Box sx={{ mt: 2 }}>{data.standardAnswer}</Box>
      <List>
        <ListSubheader
          component='div'
          id='nested-list-subheader'
          sx={{ bgcolor: 'transparent', paddingLeft: 0 }}
        >
          키워드 채점 기준
        </ListSubheader>
        {data.gradingStandards
          .filter((e) => e.type === STANDARD_TYPE.KEYWORD)
          .map((keyword) => (
            <ListItem key={keyword.content} disablePadding>
              <ListItemText primary={keyword.content} />
              <ListItemText primary={keyword.score} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        <ListSubheader
          component='div'
          id='nested-list-subheader'
          sx={{ bgcolor: 'transparent', pl: 0 }}
        >
          내용 채점 기준
        </ListSubheader>
        {data.gradingStandards
          .filter((e) => e.type === STANDARD_TYPE.CONTENT)
          .map((keyword) => (
            <ListItem key={keyword.content} disablePadding>
              <ListItemText primary={keyword.content} />
              <ListItemText primary={keyword.score} />
            </ListItem>
          ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <FormGroup>
          <FormControlLabel
            disabled
            control={<Switch />}
            label='채점 가능 여부'
            onClick={handleProblemGradablility}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label='활성화 여부'
            onClick={handleProblemActivate}
          />
        </FormGroup>
        <Link to={URLWithParam.LONG_PROBLEM_EDIT(id!)}>
          <Button variant='contained'>수정</Button>
        </Link>
      </Box>
    </PageTemplate>
  );
};
