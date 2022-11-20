import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { formatBalance } from 'utils/common';
import { PopupBanking, PopupDeposit, PopupLogout, PopupWithdraw } from './components';

const Member = () => {
  const { incId, balance } = useSelector(profileSelector);

  const [openLogout, setOpenLogout] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  return (
    <div>
      <div className='h-[60px] flex justify-center items-center'>
        <span className='font-bold text-xl'>Tài khoản</span>
      </div>
      <div className='relative mx-[12px]'>
        <img src={require('assets/images/Cover-background.png')} className='rounded-[24px]' />
        <div className='absolute inset-5 text-white'>
          <div className='font-bold'>ID: {incId}</div>
          <div className='text-center mt-3'>
            <div>Số dư tài khoản</div>
            <div className='font-bold text-[48px]'>{formatBalance(balance)}</div>
          </div>
        </div>
        <img src={require('assets/images/Cover-sticker.png')} className='absolute top-[-20px] right-[12px] w-[60px]' />
      </div>

      <div className='h-[80px] flex items-stretch gap-6 mx-6 my-6'>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          className='rounded-[24px]'
          onClick={() => setOpenDeposit(true)}
        >
          <div>Nạp tiền</div>
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          className='rounded-[24px]'
          onClick={() => setOpenWithdraw(true)}
        >
          <div>Rút tiền</div>
        </Button>
      </div>

      <div className='mx-6'>
        <PopupBanking />
      </div>

      <div className='flex justify-center mx-6 my-10'>
        <Button onClick={() => setOpenLogout(true)}>Đăng xuất</Button>
      </div>

      <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
        <PopupLogout onClose={() => setOpenLogout(false)} />
      </Dialog>
      <Dialog open={openDeposit} onClose={() => setOpenDeposit(false)}>
        <PopupDeposit onClose={() => setOpenDeposit(false)} />
      </Dialog>
      <Dialog open={openWithdraw} fullScreen>
        <PopupWithdraw onClose={() => setOpenWithdraw(false)} />
      </Dialog>
    </div>
  );
};

export default Member;
