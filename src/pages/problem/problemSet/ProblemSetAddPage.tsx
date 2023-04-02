import PageTemplate from '../../../templates/PageTemplate';
import {
  Box,
  TextField,
  Button,
  Card,
  Chip,
  Typography,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { problemSetApiWrapper } from '../../../api/wrapper/problem/problemSetApiWrapper';
import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from 'react';
import { problemApiWrapper } from '../../../api/wrapper/problem/problemApiWrapper';
import {
  IProblemSearchParam,
  ISearchProblem,
  ISearchProblemElement,
} from '../../../types/problem/api';

interface IProblem {
  id: number;
  title: string;
}

interface ISearchOption extends IProblem {
  label: string;
}

const mockData = {
  problemIds: [476, 479, 477, 478, 480],
  name: '컴파일러와 인터프리터',
  description: '컴파일러와 인터프리터에 대해 알아봅시다.',
};

const MAX_CNT = 5;
const MIN_CNT = 2;

export const ProblemSetAddPage = () => {
  const [searchParams, setSearchParams] = useState<IProblemSearchParam>({});
  const [selectedProblems, setSelectedProblems] = useState<IProblem[]>([]);
  const { data: searchOptions } = useQuery(['problem-list'], () =>
    problemApiWrapper.searchProblem(searchParams),
  );
  const { mutate: submit } = useMutation(
    ['problemset-create'],
    () => problemSetApiWrapper.createProblemSet(beforeSubmit()),
    {
      onSuccess: () => {
        alert('문제 세트가 생성되었습니다.');
      },
    },
  );
  const onSelectChange = (e: SyntheticEvent, value: any) => {
    if (selectedProblems.length >= MAX_CNT) return;
    const { id, title } = value as ISearchProblemElement;
    setSelectedProblems((prev) => [...prev, { id, title }]);
  };

  const onProblemDelete = (e: any) => {
    const problemTitle = e.target.closest('.selected-problem').querySelector('span').innerHTML;
    setSelectedProblems((prev) => prev.filter((problem) => problem.title !== problemTitle));
  };

  const beforeSubmit = () => {
    if (selectedProblems.length < MIN_CNT) {
      alert(`문제세트의 최소 문제 개수는 ${MIN_CNT}개 입니다.`);
    }
    const data = {
      problemIds: selectedProblems.map((problem) => problem.id),
      name: (document.querySelector('#name') as HTMLInputElement).value ?? '',
      description: (document.querySelector('#description') as HTMLInputElement).value ?? '',
    };
    return data;
  };

  return (
    <PageTemplate>
      <Typography sx={{ fontSize: 24 }}>문제 세트 생성</Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
      >
        <TextField id='name' label='제목' />
        <TextField id='description' label='설명' sx={{ mt: 2 }} />
        <Card sx={{ p: 2, mt: 2 }}>
          <Typography>문제 목록</Typography>
          <Box sx={{ mt: 1 }}>
            {selectedProblems.map(({ id, title }) => (
              <Chip
                label={title}
                onDelete={onProblemDelete}
                key={id}
                sx={{ mt: 1, mr: 1 }}
                className='selected-problem'
              />
            ))}
          </Box>
          <Autocomplete
            disablePortal
            getOptionLabel={(option) => option.title}
            options={searchOptions?.contents ?? []}
            sx={{ width: 300, mt: 2 }}
            filterOptions={(x) => x}
            onChange={onSelectChange}
            open
            renderInput={(params) => (
              <TextField
                {...params}
                label='문제 검색'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {searchOptions?.contents.length === 0 ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.title}
                </li>
              );
            }}
          />
        </Card>
      </Box>
      <Button variant='contained' sx={{ mt: 2 }} onClick={() => submit()}>
        저장
      </Button>
    </PageTemplate>
  );
};
