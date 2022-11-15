import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CloseButton } from 'components';
import { transactionService } from 'services';

const Withdraw = ({ onClose }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(transactionService.createWithdraw, {
    onSuccess: () => {
      enqueueSnackbar('Đặt lệnh thành công', { variant: 'success' });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });
  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutate(values);
    })();
  };
  return (
    <>
      <DialogTitle className='text-center'>Rút tiền</DialogTitle>

      <DialogContent>
        <Controller
          name='amount'
          defaultValue=''
          control={control}
          rules={{ required: 'Bắt buộc', min: { value: 1, message: 'Lớn hơn 1' } }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              required
              placeholder='Số tiền rút'
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                },
              }}
              variant='standard'
              type='number'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
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
            Đặt lệnh
          </LoadingButton>
        </div>
      </DialogContent>
      <CloseButton onClick={onClose} />
    </>
  );
};

export default Withdraw;
