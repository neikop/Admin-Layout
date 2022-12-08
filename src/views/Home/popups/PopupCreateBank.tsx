import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputNumber } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { dashboardService, queryClient } from 'services';

const PopupCreateBank = ({ onClose }: PopupController) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: createBank, isLoading } = useMutation(dashboardService.createBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['dashboardService.fetchBanks']);
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createBank(values as BankCreateType);
    })();
  };

  return (
    <>
      <DialogTitle>Create Bank</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='customerId'
              defaultValue=''
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Customer ID'
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    inputComponent: InputNumber as any,
                    inputProps: { decimalScale: 0 },
                  }}
                />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='numberBank'
              defaultValue=''
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Number Bank' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='note'
              defaultValue=''
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  multiline
                  fullWidth
                  label='Note'
                  minRows={2}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' loading={isLoading} onClick={handleClickSubmit}>
          Create
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupCreateBank;
