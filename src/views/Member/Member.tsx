import { ContentPaste } from '@mui/icons-material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Button, Dialog, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from '../../reducers/profileSlice';
import Deposit from './Deposit';
import Deposited from './Deposited';
import History from './History';
import LinkBank from './LinkBank';
import Withdraw from './Withdraw';
import Withdrawn from './Withdrawn';
const Member = () => {
  const { incId, username, balance } = useSelector(profileSelector);
  const dispatch = useDispatch();
  const [history, setHistory] = useState(false);
  const [deposited, setDeposited] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [linkbank, setLinkBank] = useState(false);

  return (
    <div className='p-3'>
      <Box className='flex px-3 justify-center'>
        <label className='text-white text-xl font-normal'>Trung tâm thành viên</label>
      </Box>
      <Box className='my-5'>
        Người dùng : {username} - ID: {incId}
      </Box>
      <Box className='text-center py-5 px-8 rounded flex-col' style={{ background: '#1E2843', borderRadius: '4px' }}>
        <label className='leading-8'>Số dư tài khoản</label>
        <label className='py-5 block text-6xl'>{balance}</label>
        <Box className='flex justify-around border rounded border-orange-500 w-7/12 justify-center m-auto place-content-center p-3'>
          <Button
            onClick={() => {
              setDeposit(true);
            }}
            variant='text'
            color='inherit'
            className='flex-col text-center'
          >
            <img src={require('../../assets/images/withdraw.png')} alt='vin' loading='lazy' />
            Nạp Tiền
          </Button>

          <Divider orientation='vertical' flexItem className='bg-orange-500' />
          <Button
            onClick={() => {
              setWithdraw(true);
            }}
            variant='text'
            color='inherit'
            className='flex-col text-center'
          >
            <img src={require('../../assets/images/deposit.png')} alt='vin' loading='lazy' />
            Rút Tiền
          </Button>
        </Box>
      </Box>
      <Paper sx={{ background: 'unset', color: 'unset' }}>
        <MenuList
          sx={{
            paddingTop: '20px',
            '& > li': {
              padding: '17px 10px',
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setHistory(true);
            }}
          >
            <ListItemIcon>
              <AccessTimeOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Lịch sử tham gia</ListItemText>
            <ArrowForwardIosIcon fontSize='small' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeposited(true);
            }}
          >
            <ListItemIcon>
              <AccountBalanceWalletOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Lịch sử nạp</ListItemText>
            <ArrowForwardIosIcon fontSize='small' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setWithdrawn(true);
            }}
          >
            <ListItemIcon>
              <ContentPaste fontSize='small' />
            </ListItemIcon>
            <ListItemText>Lịch sử rút</ListItemText>
            <ArrowForwardIosIcon fontSize='small' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setLinkBank(true);
            }}
          >
            <ListItemIcon>
              <AccountBalanceOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Liên kết ngân hàng</ListItemText>
            <ArrowForwardIosIcon fontSize='small' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(signOut({}));
            }}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
            <ArrowForwardIosIcon fontSize='small' />
          </MenuItem>
        </MenuList>
      </Paper>

      <Dialog data-aos='fade-left' data-aos-offset='600' data-aos-duration='600' open={history} fullWidth>
        <History onClose={() => setHistory(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={withdrawn}
        fullWidth
        style={{ height: '100%' }}
      >
        <Withdrawn onClose={() => setWithdrawn(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={withdraw}
        fullWidth
        style={{ height: '100%' }}
      >
        <Withdraw onClose={() => setWithdraw(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={deposited}
        fullWidth
        style={{ height: '100%' }}
      >
        <Deposited onClose={() => setDeposited(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={linkbank}
        fullWidth
        style={{ height: '100%' }}
      >
        <LinkBank onClose={() => setLinkBank(false)} />
      </Dialog>
      <Dialog
        data-aos='fade-left'
        data-aos-offset='600'
        data-aos-duration='600'
        open={deposit}
        fullWidth
        style={{ height: '100%' }}
      >
        <Deposit onClose={() => setDeposit(false)} />
      </Dialog>
    </div>
  );
};

export default Member;
