import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type PopupProps = PopupController & {
  message: string;
};

const PopupAlert = ({ onClose, message }: PopupProps) => {
  return (
    <div style={{ background: `url(${require('assets/images/Moneydrop.png')}) no-repeat top / cover` }}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <div className='text-center text-neutral'>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' className='w-[160px]' onClick={onClose}>
          Đồng ý
        </Button>
      </DialogActions>
    </div>
  );
};

export default PopupAlert;
