import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { dashboardService, queryClient } from 'services';

type PopupProps = PopupController & {
  id: string;
};

const DeleteConfirmPopup = ({ id, onClose }: PopupProps) => {
  const { mutate: deleteBank, isLoading } = useMutation(dashboardService.deleteBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['dashboardService.fetchBanks']);
      onClose();
    },
  });

  const handleClickDelete = () => {
    deleteBank({ id });
  };

  return (
    <>
      <DialogTitle>Confirmation</DialogTitle>

      <DialogContent>
        Are you want to <span className='font-bold text-red-700'>DELETE</span> this bank?
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' loading={isLoading} onClick={handleClickDelete}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteConfirmPopup;
