import {} from '@mui/icons-material';
import { Button, DialogContent, DialogTitle, TextField } from '@mui/material';
import { CloseButton } from '../../components';

const Withdraw = ({ onClose }: any) => {
  return (
    <>
      <DialogTitle className='text-center'>Rút tiền</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          style={{ background: '#1E2843', color: 'white' }}
          id='outlined-basic'
          label='Số tiền rút'
          color='secondary'
          variant='outlined'
        />
        <Button color='inherit' variant='outlined'>
          Đặt lệnh
        </Button>
      </DialogContent>
      <Button>Liên kết Ngân hàng</Button>
      <CloseButton onClick={onClose} />
    </>
  );
};

export default Withdraw;
