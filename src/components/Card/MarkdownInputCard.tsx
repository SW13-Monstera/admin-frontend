import { Card, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useMarkdownInput } from '../../hooks/useMarkdownInput';
import { MarkdownCard } from './MarkdownCard';

interface IMarkdownCard {
  id: string;
  title: string;
  children: string | undefined;
  defaultValue: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MarkdownInputCard = ({ id, title, defaultValue }: IMarkdownCard) => {
  const { value, handleValueChange } = useMarkdownInput(defaultValue);
  return (
    <Card sx={{ p: 2, my: 1 }} variant='outlined'>
      <Typography color='text.secondary' sx={{ fontSize: 12 }}>
        {title}
      </Typography>
      <MarkdownCard>{value}</MarkdownCard>
      <TextField
        id={id}
        label='입력란'
        multiline
        defaultValue={defaultValue}
        sx={{ my: 2, width: '100%' }}
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxLength: 300 }}
        onChange={handleValueChange}
        variant='filled'
      />
    </Card>
  );
};
