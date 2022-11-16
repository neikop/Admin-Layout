import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signOut } from 'reducers/profileSlice';

type PopupProps = PopupController & {};

const PopupLogout = ({ onClose }: PopupProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <DialogTitle>Đăng xuất</DialogTitle>
      <DialogContent>
        <div className='text-center text-neutral'>Bạn có chắc chắn đăng xuất tài khoản?</div>
      </DialogContent>
      <DialogActions>
        <div className='flex flex-col gap-1'>
          <Button variant='contained' className='w-[160px]' onClick={() => dispatch(signOut({}))}>
            Đăng xuất
          </Button>
          <Button color='inherit' size='medium' className='w-[160px]' onClick={onClose}>
            HUỶ
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

export default PopupLogout;
