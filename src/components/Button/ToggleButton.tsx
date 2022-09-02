import { FormControlLabel, Switch } from '@mui/material';

interface IToggleButton {
  data: any;
  onClick: () => void;
}

export const ToggleButton = ({ data, onClick }: IToggleButton) => {
  return (
    <FormControlLabel
      checked={data?.isActive}
      control={<Switch checked={data?.isActive ?? false} />}
      label='활성화 여부'
      onClick={onClick}
    />
  );
};
