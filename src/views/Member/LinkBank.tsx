import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CloseButton } from 'components';
import { transactionService } from 'services';

const LinkBank = ({ onClose }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(transactionService.updateBank, {
    onSuccess: () => {
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });
  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutate('', values);
    })();
  };
  return (
    <>
      <DialogTitle className='text-center'>Liên kết ngân hàng</DialogTitle>
      <DialogContent>
        <Controller
          name='bankName'
          defaultValue=''
          control={control}
          rules={{ required: 'Bắt buộc', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              required
              placeholder='Tên ngân hàng'
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                },
              }}
              variant='standard'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='bankAccountNumber'
          defaultValue=''
          control={control}
          rules={{ required: 'Bắt buộc', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              required
              placeholder='Số tài khoản'
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                },
              }}
              variant='standard'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='bankAccountHolder'
          defaultValue=''
          control={control}
          rules={{ required: 'Bắt buộc', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              required
              placeholder='Tên chủ tài khoản'
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                },
              }}
              variant='standard'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        * Quý khách vui lòng điền đúng thông tin
        <div className='p-5'>
          <LoadingButton
            fullWidth
            variant='contained'
            sx={{
              background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
              borderRadius: '10px',
              padding: '10px',
            }}
            loading={isLoading}
            onClick={handleClickSubmit}
          >
            Đăng ký
          </LoadingButton>
        </div>
      </DialogContent>
      <CloseButton onClick={onClose} />
    </>
  );
};

export default LinkBank;
