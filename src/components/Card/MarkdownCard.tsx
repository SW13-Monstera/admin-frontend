import { Card, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface IMarkdownCard {
  title?: string;
  children: string | undefined;
}

export const MarkdownCard = ({ title, children }: IMarkdownCard) => {
  return (
    <Card sx={{ p: 2 }} variant='outlined'>
      <Typography color='text.secondary' sx={{ fontSize: 12 }}>
        {title}
      </Typography>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
        {children ?? ''}
      </ReactMarkdown>
    </Card>
  );
};
