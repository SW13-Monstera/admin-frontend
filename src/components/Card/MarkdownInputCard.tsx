import { Card, TextField, Typography } from '@mui/material';
import { useMarkdownInput } from '../../hooks/useMarkdownInput';
import { MarkdownCard } from './MarkdownCard';

interface IMarkdownCard {
  id: string;
  title: string;
  defaultValue?: string | undefined;
  maxLength?: number;
}

export const MarkdownInputCard = ({ id, title, defaultValue, maxLength }: IMarkdownCard) => {
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
        inputProps={{ maxLength: maxLength ?? 300 }}
        onChange={handleValueChange}
        variant='filled'
      />
    </Card>
  );
};
