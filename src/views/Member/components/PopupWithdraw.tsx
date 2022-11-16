import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { CloseButton, InputNumber } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { transactionService } from 'services';

type PopupProps = PopupController & {};

const PopupWithdraw = ({ onClose }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: createWithdraw, isLoading } = useMutation(transactionService.createWithdraw, {
    onSuccess: () => {
      enqueueSnackbar('Đặt lệnh rút tiền thành công');
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createWithdraw(values);
    })();
  };

  return (
    <>
      <CloseButton onClick={onClose} />
      <DialogTitle>Rút tiền</DialogTitle>
      <DialogContent className='space-y-4'>
        <Controller
          control={control}
          name='amount'
          defaultValue=''
          rules={{
            required: 'Số tiền rút không được để trống',
            min: { value: 1, message: 'Số tiền rút phải lớn hơn 0' },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Số tiền rút</label>
              <TextField
                {...field}
                variant='outlined'
                InputProps={{
                  inputComponent: InputNumber,
                  inputProps: { maxLength: 12 },
                }}
                error={!!error}
                helperText={error?.message}
              />
            </FormControl>
          )}
        />
      </DialogContent>
      <DialogActions>
        <div className='flex flex-col gap-1'>
          <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
            Gửi yêu cầu
          </LoadingButton>
          <Button color='inherit' size='medium' className='w-[160px]' onClick={onClose}>
            HUỶ
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default PopupWithdraw;
