import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from '../../reducers/profileSlice';
import Deposit from './Deposit';
import LinkBank from './LinkBank';
import Withdraw from './Withdraw';
const Member = () => {
  const { incId, username, balance } = useSelector(profileSelector);
  const dispatch = useDispatch();
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [linkbank, setLinkBank] = useState(false);

  return (
    <>
      <Box className='flex p-3 justify-center'>
        <label className='text-xl font-normal'>Tài khoản</label>
      </Box>
      <Box className='text-center p-8 rounded flex-col'>
        <Box className='balancebox'>
          <label className='py-5 block'>
            Người dùng : {username} - ID: {incId}
          </label>
          <label className='leading-8'>Số dư tài khoản</label>
          <label className='py-5 block text-6xl'>{balance}</label>
        </Box>

        <Box className='flex justify-between mt-8'>
          <Button
            onClick={() => {
              setDeposit(true);
            }}
            variant='text'
            color='inherit'
            className='flex-col text-center'
            sx={{
              background: 'linear-gradient(180deg, #FF9E7E 0%, #FF5018 100%)',
              boxShadow: '0px 4px 4px rgba(236, 79, 29, 0.3)',
              borderRadius: '24px',
              color: '#fff',
              opacity: '0.8',
              minWidth: '47%',
              padding: '35px',
            }}
          >
            Nạp Tiền
          </Button>

          <Button
            onClick={() => {
              setWithdraw(true);
            }}
            variant='text'
            color='inherit'
            className='flex-col text-center'
            sx={{
              background: 'linear-gradient(180deg, #FF9E7E 0%, #FF5018 100%)',
              boxShadow: '0px 4px 4px rgba(236, 79, 29, 0.3)',
              borderRadius: '24px',
              color: '#fff',
              opacity: '0.8',
              padding: '35px',
              minWidth: '47%',
            }}
          >
            Rút Tiền
          </Button>
        </Box>
        <Button
          onClick={() => {
            setLinkBank(true);
          }}
          fullWidth
          variant='text'
          className='justify-between'
          sx={{
            background: '#FFFFFFd1',
            borderRadius: '24px',
            padding: '20px',
            opacity: '0.8',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          Liên kết ngân hàng
          <ArrowForwardIosIcon fontSize='small' />
        </Button>
        <Button
          onClick={() => {
            dispatch(signOut({}));
          }}
          variant='text'
          className='text-cente'
          sx={{ marginTop: '20vh' }}
        >
          Đăng xuất
        </Button>
      </Box>

      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={withdraw}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            margin: 0,
            minHeight: '100%',
            width: '100%',
            background: `linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${require('../../assets/images/background.png')})`,
            mixBlendMode: 'normal',
          },
        }}
      >
        <Withdraw onClose={() => setWithdraw(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={linkbank}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            margin: 0,
            width: '100%',
            minHeight: '100%',
            background: `linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${require('../../assets/images/background.png')})`,
            mixBlendMode: 'normal',
          },
        }}
      >
        <LinkBank onClose={() => setLinkBank(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={deposit}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            minHeight: '100%',
            width: '100%',
            margin: 0,
            background: `linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${require('../../assets/images/background.png')})`,
            mixBlendMode: 'normal',
          },
        }}
      >
        <Deposit onClose={() => setDeposit(false)} />
      </Dialog>
    </>
  );
};

export default Member;
