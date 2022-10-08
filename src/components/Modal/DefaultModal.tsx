import { Box, Modal, Typography } from '@mui/material';

interface IDefaultModal {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const DefaultModal = ({ open, handleClose, title, children }: IDefaultModal) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: '4px 8px 24px rgba(0, 0, 0, 0.16)',
  p: 4,
};
