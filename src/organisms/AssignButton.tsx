import { Button } from '@mui/material';
import { DefaultModal } from '../components/Modal/DefaultModal';
import { useModal } from '../hooks/useModal';
import { AssignForm } from './assignForm';

interface IAssignButton {
  title: string;
  minId: number;
  maxId: number;
  submit: (nums: number[], adminId: string) => void;
}

export const AssignButton = ({ title, minId, maxId, submit }: IAssignButton) => {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <>
      <Button onClick={handleOpen} variant='outlined'>
        {title}
      </Button>
      <DefaultModal open={open} handleClose={handleClose} title={title}>
        <AssignForm
          minId={minId}
          maxId={maxId}
          submit={(nums: number[], adminId: string) => {
            submit(nums, adminId);
            handleClose();
          }}
        />
      </DefaultModal>
    </>
  );
};
