import { Box, TextField, Typography } from '@mui/material';

interface ITextNumberInput {
  text: string;
  number: number;
  id: string;
}

export const TextNumberInput = ({ text, number, id }: ITextNumberInput) => {
  return (
    <Box sx={{ display: 'flex', my: 1 }} key={id}>
      <TextField
        id={`name${id}`}
        label='문자 입력란'
        variant='outlined'
        defaultValue={text}
        sx={{ mr: 1, width: '90%' }}
      />
      <TextField
        id={`score-${id}`}
        label='숫자 입력란'
        type='number'
        defaultValue={number}
        inputProps={{
          min: '0',
          max: '5',
          step: '0.5',
        }}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mr: 1, width: '10%' }}
      />
    </Box>
  );
};
