import { FormGroup, Checkbox, TextField } from '@mui/material';

interface ICheckboxFormGroup {
  isChecked: boolean;
  text: string;
}

export const CheckboxFormGroup = ({ isChecked, text }: ICheckboxFormGroup) => {
  return (
    <FormGroup sx={{ display: 'flex', flexDirection: 'row', width: '100% ', m: 2 }}>
      <Checkbox checked={isChecked} />
      <TextField value={text} sx={{ width: '90% ' }} placeholder='선택지 내용' />
    </FormGroup>
  );
};
