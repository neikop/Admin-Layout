import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { CloseButton, InputNumber } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { authService, transactionService } from 'services';
import { PopupBanking } from '.';

type PopupProps = PopupController & {};

const PopupWithdraw = ({ onClose }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const { data: profile, isSuccess } = useQuery(['authService.getProfile'], () => authService.getProfile(), {
    staleTime: 0,
  });

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
      <DialogContent>
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
        <div className='mt-[40px]'>
          {isSuccess &&
            (!profile?.bankAccountNumber ? (
              <>
                <div className='text-error mb-3'>* Chưa liên kết ngân hàng</div>
                <div>
                  <PopupBanking />
                </div>
              </>
            ) : (
              <div className='bg-white rounded-[24px]'>
                <div className='font-bold text-primary-main border-b px-[24px] py-[20px]'>Thông tin ngân hàng</div>
                <div className='px-[24px] py-[20px] space-y-1'>
                  <div>{profile.bankName}</div>
                  <div>{profile.bankAccountNumber}</div>
                  <div>{profile.bankAccountHolder}</div>
                </div>
              </div>
            ))}
        </div>
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
