import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type PopupProps = PopupController & {
  message: string;
};

const PopupDeposit = ({ onClose, message }: PopupProps) => {
  return (
    <>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <div className='text-center text-neutral'>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' className='w-[160px]' onClick={onClose}>
          Đồng ý
        </Button>
      </DialogActions>
    </>
  );
};

export default PopupDeposit;
