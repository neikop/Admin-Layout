import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { InputNumber } from 'components';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { transactionService } from 'services';

type PopupProps = PopupController & {
  item: {
    zone: ZoneType;
    game: string;
    gate: string;
  };
};

const PopupBet = ({ onClose, item }: PopupProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch } = useForm({ mode: 'onChange' });
  const { amount = 100 } = watch();

  const { mutate: createBet, isLoading } = useMutation(transactionService.createBet, {
    onSuccess: () => {
      enqueueSnackbar('Đặt lệnh thành công');
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createBet({ ...values, ...item });
    })();
  };

  useEffect(() => {
    setValue('amount', 100);
  }, [setValue]);

  return (
    <>
      <DialogTitle>Số tiền đặt</DialogTitle>
      <DialogContent>
        <div className='flex items-center space-x-2'>
          <Button size='medium' onClick={() => setValue('amount', Math.max(10, amount - 10))}>
            <img src={require('assets/icons/Minus.svg').default} className='scale-125' />
          </Button>
          <Controller
            control={control}
            name='amount'
            defaultValue=''
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
                  style: { fontSize: 16, fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ECE8F3',
                    borderWidth: '1px !important',
                    borderRadius: '4px !important',
                    boxShadow: '#0002 0px 4px 8px',
                  },
                }}
                error={!!error}
              />
            )}
          />
          <Button size='medium' onClick={() => setValue('amount', amount + 10)}>
            <img src={require('assets/icons/Add.svg').default} className='scale-125' />
          </Button>
        </div>

        <Grid container spacing={1.2} className='mt-2'>
          {[50, 100, 150, 200, 250, 300].map((value, index) => {
            const isSelected = value === amount;
            return (
              <Grid key={index} item xs={4}>
                <Button
                  fullWidth
                  size='medium'
                  variant={isSelected ? 'contained' : 'outlined'}
                  color={isSelected ? 'secondary' : 'inherit'}
                  classes={{ outlinedInherit: 'text-black/80 border-2 border-line' }}
                  className='h-[40px] rounded-[8px] text-[20px]'
                  onClick={() => setValue('amount', value)}
                >
                  {value}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <div className='flex flex-col space-y-1'>
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
