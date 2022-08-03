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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { longProblemApiWrapper } from '../../../api/wrapper/problem/longProblemApiWrapper';
import { URLWithParam } from '../../../constants/url';
import { IProblemDetailResponse } from '../../../types/problem/api';
import { STANDARD_TYPE } from '../../../constants/standard';

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

  if (!id) return;

  useEffect(() => {
    longProblemApiWrapper.getLongProblemDetail({ problem_id: parseInt(id) }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <PageTemplate>
      <Typography variant='h4'>{data.title}</Typography>
      <Box sx={{ mt: 2 }}>{data.description}</Box>
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
          <FormControlLabel disabled control={<Switch />} label='채점 가능 여부' />
          <FormControlLabel control={<Switch defaultChecked />} label='활성화 여부' />
        </FormGroup>
        <Link to={URLWithParam.LONG_PROBLEM_EDIT(id)}>
          <Button variant='contained'>수정</Button>
        </Link>
      </Box>
    </PageTemplate>
  );
};
