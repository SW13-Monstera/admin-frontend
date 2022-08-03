import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IDeleteButton {
  id: string;
}

export const DeleteButton = ({ id }: IDeleteButton) => {
  return (
    <IconButton aria-label='delete' id={id}>
      <DeleteIcon />
    </IconButton>
  );
};
