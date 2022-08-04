import PageTemplate from '../../../templates/PageTemplate';
import {
  Typography,
  Box,
  Card,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { IDataDetailResponseData } from '../../../types/data/api';
import { URLWithParam } from '../../../constants/url';

interface ICheckedState {
  id: number;
  checked: boolean;
}

export const DataLabelingPage = () => {
  const [data, setData] = useState<IDataDetailResponseData>({
    id: 0,
    answer: '',
    isLabeled: false,
    isValidated: false,
    keywordsGradingStandards: [],
    promptGradingStandards: [],
  });
  const [keywordStandards, setKeywordStandards] = useState<ICheckedState[]>([]);
  const [contentStandards, setContentStandards] = useState<ICheckedState[]>([]);

  const { id: dataId } = useParams();
  if (!dataId) return;

  function handleKeywordChange(event: ChangeEvent) {
    setKeywordStandards((prev) =>
      prev.map((e) =>
        e.id.toString() === event.target.id ? { id: e.id, checked: !e.checked } : e,
      ),
    );
  }
  function handleContentChange(event: ChangeEvent) {
    setContentStandards((prev) =>
      prev.map((e) =>
        e.id.toString() === event.target.id ? { id: e.id, checked: !e.checked } : e,
      ),
    );
  }

  function postLabelingData() {
    const postData = {
      user_answer_id: data.id,
      selectedGradingStandardIds: [
        ...keywordStandards.map((e) => (e.checked ? e.id : -1)),
        ...contentStandards.map((e) => (e.checked ? e.id : -1)),
      ].filter((e) => e !== -1),
    };
    dataApiWrapper.labelingData(postData);
  }

  useEffect(() => {
    dataApiWrapper
      .getDataDetail({
        user_answer_id: parseInt(dataId),
      })
      .then((res) => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    setKeywordStandards(
      data.keywordsGradingStandards.map((e) => {
        return { id: e.id, checked: false };
      }),
    );
    setContentStandards(
      data.promptGradingStandards.map((e) => {
        return { id: e.id, checked: false };
      }),
    );
  }, [data]);

  return (
    <PageTemplate title='AI 데이터 관리'>
      <Typography variant='h4'>라벨링 #{data.id}</Typography>
      <Box sx={{ mt: 2 }}>{}</Box>
      <Card variant='outlined' sx={{ mt: 2, p: 2 }}>
        {data.answer}
      </Card>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>키워드 채점 기준</FormLabel>
          <FormGroup>
            {data.keywordsGradingStandards.map((standard) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={keywordStandards.find((e) => e.id === standard.id)?.checked || false}
                    onChange={handleKeywordChange}
                    name={standard.content}
                    id={standard.id.toString()}
                  />
                }
                label={`${standard.content}  |  ${standard.score}점`}
                key={standard.id}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>내용 채점 기준</FormLabel>
          <FormGroup>
            {data.promptGradingStandards.map((standard) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contentStandards.find((e) => e.id === standard.id)?.checked || false}
                    onChange={handleContentChange}
                    name={standard.content}
                    id={standard.id.toString()}
                  />
                }
                label={`${standard.content}  |  ${standard.score}점`}
                key={standard.id}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Link to={URLWithParam.DATA_LABELING(data.id.toString())}>
        <Button variant='contained' onClick={postLabelingData}>
          제출
        </Button>
      </Link>
    </PageTemplate>
  );
};
