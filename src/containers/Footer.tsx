import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { AppBar, IconButton } from '@mui/material';
import { AppMenu } from 'containers';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { formatBalance } from 'utils/common';

const Footer = () => {
  const { incId, balance } = useSelector(profileSelector);
  const [showBalance, setShowBalance] = useState(false);

  return (
    <AppBar component='footer' position='relative' color='transparent' elevation={0} className='pt-[40px]'>
      <div className='w-full h-[40px] absolute top-[0px] bg-[#1E2843] rounded-full'>
        <div className='flex justify-between items-center px-[16px] font-bold text-white'>
          <div>Số dư tài khoản ID: {incId}</div>
          <div className='flex items-center'>
            <div className='text-secondary-main'>
              {formatBalance(balance)
                .split('')
                .map((number, index) => (
                  <span key={index}>{showBalance ? number : '*'}</span>
                ))}
            </div>
            <IconButton className='text-white/80' onClick={() => setShowBalance((prev) => !prev)}>
              {showBalance ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </div>
        </div>
      </div>
      <AppMenu />
    </AppBar>
  );
};

export default Footer;
