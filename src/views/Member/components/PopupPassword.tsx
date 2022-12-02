import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { CloseButton } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { authService } from 'services';

type PopupProps = PopupController & {};

const PopupPassword = ({ onClose }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const { newPassword } = watch();

  const { mutate: changePassword, isLoading } = useMutation(authService.changePassword, {
    onSuccess: () => {
      enqueueSnackbar('Đổi mật khẩu thành công');
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      changePassword(values);
    })();
  };

  return (
    <>
      <CloseButton onClick={onClose} />
      <DialogTitle>Đổi mật khẩu</DialogTitle>
      <DialogContent className='space-y-4'>
        <Controller
          name='oldPassword'
          defaultValue=''
          control={control}
          rules={{
            minLength: { value: 6, message: 'Mật khẩu không hợp lệ' },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Mật khẩu cũ</label>
              <TextField {...field} fullWidth variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name='newPassword'
          defaultValue=''
          control={control}
          rules={{
            required: 'Mật khẩu không được để trống',
            minLength: { value: 6, message: 'Mật khẩu có ít nhất 6 ký tự' },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Mật khẩu mới</label>
              <TextField {...field} fullWidth variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name='passwordConfirm'
          defaultValue=''
          control={control}
          rules={{
            required: 'Mật khẩu không hợp lệ',
            validate: {
              match: (value) => value === newPassword || 'Mật khẩu không khớp',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Xác nhận mật khẩu</label>
              <TextField {...field} fullWidth variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
      </DialogContent>
      <DialogActions>
        <div className='flex flex-col space-y-1'>
          <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
            Đổi mật khẩu
          </LoadingButton>
          <Button color='inherit' size='medium' className='w-[160px]' onClick={onClose}>
            HUỶ
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default PopupPassword;
