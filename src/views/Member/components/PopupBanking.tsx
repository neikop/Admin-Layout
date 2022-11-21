import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { CloseButton } from 'components';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { queryClient, transactionService } from 'services';

const PopupBanking = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id: playerId } = useSelector(profileSelector);

  const [openBanking, setOpenBanking] = useState(false);

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: updateBank, isLoading } = useMutation(transactionService.updateBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['authService.getProfile']);
      enqueueSnackbar('Liên kết ngân hàng thành công');
      setOpenBanking(false);
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateBank({
        playerId,
        body: values,
      });
    })();
  };

  return (
    <>
      <Button
        fullWidth
        className='h-[72px] bg-white/80 hover:brightness-90 rounded-[24px] flex justify-between px-6'
        onClick={() => setOpenBanking(true)}
      >
        <span>Liên kết ngân hàng</span>
        <ArrowForwardIosIcon fontSize='small' />
      </Button>

      <Dialog open={openBanking} fullScreen>
        <CloseButton onClick={() => setOpenBanking(false)} />
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
          <div className='flex flex-col space-y-1'>
            <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
              Xác nhận
            </LoadingButton>
            <Button color='inherit' size='medium' className='w-[160px]' onClick={() => setOpenBanking(false)}>
              HUỶ
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupBanking;
