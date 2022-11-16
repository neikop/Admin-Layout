import { Add, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { InputNumber } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { betService } from 'services';

type PopupProps = PopupController & {
  item: {
    zone: string;
    game: string;
    gate: string;
  };
};

const PopupBet = ({ onClose, item }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch } = useForm({ mode: 'onChange' });
  const { amount = 10 } = watch();

  const { mutate: createBet, isLoading } = useMutation(betService.bet, {
    onSuccess: () => {
      enqueueSnackbar('Đặt cược thành công');
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createBet({ ...values, ...item });
    })();
  };

  return (
    <>
      <DialogTitle>Đặt cược</DialogTitle>
      <DialogContent>
        <div className='flex gap-2'>
          <Button onClick={() => setValue('amount', Math.max(10, amount - 10))}>
            <Remove fontSize='large' />
          </Button>
          <Controller
            control={control}
            name='amount'
            defaultValue={100}
            rules={{
              required: 'Số tiền đặt không được để trống',
              min: { value: 9, message: 'Số tiền rút tối thiểu là 10' },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant='outlined'
                InputProps={{
                  inputComponent: InputNumber,
                  inputProps: { maxLength: 12 },
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '4px !important',
                    boxShadow: '#0003 0px 4px 8px',
                  },
                }}
                error={!!error}
              />
            )}
          />
          <Button onClick={() => setValue('amount', amount + 10)}>
            <Add fontSize='large' />
          </Button>
        </div>

        <Grid container spacing={1.2} className='mt-2'>
          {[50, 100, 150, 200, 250, 300].map((value, index) => (
            <Grid key={index} item xs={4}>
              <Button fullWidth variant='outlined' size='medium' onClick={() => setValue('amount', value)}>
                {value}
              </Button>
            </Grid>
          ))}
        </Grid>
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

export default PopupBet;
