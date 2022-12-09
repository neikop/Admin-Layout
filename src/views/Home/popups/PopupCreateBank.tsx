import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputNumber } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { dashboardService, queryClient } from 'services';

type PopupProps = PopupController & {
  item?: BankType;
};

const PopupCreateBank = ({ item, onClose }: PopupProps) => {
  const isCreate = !item;

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: createBank, isLoading } = useMutation(
    isCreate ? dashboardService.createBank : dashboardService.updateBank,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dashboardService.fetchBanks']);
        onClose();
      },
    },
  );

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createBank({
        id: item?.id!,
        ...(values as BankCreateType),
      });
    })();
  };

  return (
    <>
      <DialogTitle>{isCreate ? 'Create' : 'Update'} Bank</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Controller
              name='customerId'
              defaultValue={item?.customerId ?? ''}
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
              defaultValue={item?.numberBank ?? ''}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Number Bank' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name='note'
              defaultValue={item?.note ?? ''}
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
          {isCreate ? 'Create' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupCreateBank;
