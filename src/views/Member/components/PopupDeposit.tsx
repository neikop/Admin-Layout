import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type PopupProps = PopupController & {};

const PopupDeposit = ({ onClose }: PopupProps) => {
  return (
    <>
      <DialogTitle>Nạp tiền</DialogTitle>
      <DialogContent>
        <div className='text-center text-neutral'>Vui lòng liên hệ CSKH để được hướng dẫn nạp tiền</div>
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
