import { LoadingButton } from '@mui/lab';
import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../reducers/profileSlice';
import { betService } from '../../services';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const PopupBet = ({ item, onClose }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { balance } = useSelector(profileSelector);
  const { handleSubmit, reset } = useForm({ mode: 'onChange' });
  const [amount, setAmount] = useState(1000);
  const { mutate, isLoading } = useMutation(betService.bet, {
    onSuccess: (data) => {
      enqueueSnackbar('Đặt cược thành công', { variant: 'success' });
      reset();
      onClose();
    },
    onError(error) {
      enqueueSnackbar(`${(error as any).response.data.message}`, { variant: 'error' });
    },
  });
  const handleClickSubmit = () => {
    handleSubmit(() => {
      if (amount < 10) {
        enqueueSnackbar('Số tiền tối thiểu: 10', { variant: 'error' });
        reset();
      } else if (!balance || Number(amount) > balance) {
        enqueueSnackbar('Số dư không đủ', { variant: 'success' });
      } else {
        mutate({ ...item, amount });
      }
    })();
  };

  return (
    <React.Fragment>
      <DialogTitle>Số tiền đặt</DialogTitle>
      <DialogContent>
        <Box>
          <Button
            onClick={() => {
              setAmount(amount - 10);
            }}
          >
            <RemoveIcon />
          </Button>

          <TextField
            value={amount}
            sx={{ justifyContent: 'center' }}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
            required
            variant='standard'
            type='number'
          />
          <Button
            onClick={() => {
              setAmount(amount + 10);
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        {[50, 100, 150, 200, 250, 300].map((v) => (
          <Button
            key={v}
            sx={{ width: '33%' }}
            onClick={() => {
              setAmount(v);
            }}
          >
            {v}
          </Button>
        ))}
      </DialogContent>
      <DialogActions className='justify-center'>
        {/* <LoadingButton variant='contained' color='secondary' onClick={onClose}>
          Cancel
        </LoadingButton> */}
        <LoadingButton loading={isLoading} variant='contained' color='secondary' onClick={handleClickSubmit}>
          Đặt cược
        </LoadingButton>
      </DialogActions>
    </React.Fragment>
  );
};

export default PopupBet;
