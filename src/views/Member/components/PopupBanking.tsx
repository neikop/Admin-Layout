import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { CloseButton } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { transactionService } from 'services';

type PopupProps = PopupController & {};

const PopupBanking = ({ onClose }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { incId } = useSelector(profileSelector);

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: updateBank, isLoading } = useMutation(transactionService.updateBank, {
    onSuccess: () => {
      enqueueSnackbar('Liên kết ngân hàng thành công');
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateBank({
        playerId: incId,
        ...values,
      });
    })();
  };

  return (
    <>
      <CloseButton onClick={onClose} />
      <DialogTitle>Liên kết ngân hàng</DialogTitle>
      <DialogContent className='space-y-4'>
        <Controller
          control={control}
          name='bankName'
          defaultValue=''
          rules={{
            required: 'Ngân hàng không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Ngân hàng</label>
              <TextField {...field} variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='bankAccountNumber'
          defaultValue=''
          rules={{
            required: 'Số tài khoản không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Số tài khoản</label>
              <TextField {...field} variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='bankAccountHolder'
          defaultValue=''
          rules={{
            required: 'Chủ tài khoản không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
              <label>Chủ tài khoản</label>
              <TextField {...field} variant='outlined' error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <div className='text-neutral'>* Quý khách vui lòng điền đúng thông tin</div>
      </DialogContent>
      <DialogActions>
        <div className='flex flex-col gap-1'>
          <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
            Xác nhận
          </LoadingButton>
          <Button color='inherit' size='medium' className='w-[160px]' onClick={onClose}>
            HUỶ
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default PopupBanking;
