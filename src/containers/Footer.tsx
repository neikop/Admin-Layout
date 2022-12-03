import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { AppBar, IconButton } from '@mui/material';
import { AppMenu } from 'containers';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { authService } from 'services';
import { formatBalance } from 'utils/common';

const Footer = () => {
  const { incId, ...profile } = useSelector(profileSelector);
  const [showBalance, setShowBalance] = useState(true);

  const { data: balance, refetch } = useQuery(
    ['profile.balance'],
    () => authService.getProfile().then((profile) => profile.balance),
    {
      initialData: profile.balance,
      refetchInterval: 30 * 1000,
    },
  );

  return (
    <AppBar
      component='footer'
      color='transparent'
      elevation={0}
      className='pt-[40px] inset-0 top-[unset] rounded-t-[20px] max-w-[600px] mx-auto'
      style={{ background: `url(${require('assets/images/App-background.png')}) no-repeat bottom / cover` }}
    >
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
            <IconButton
              className='text-white/80'
              onClick={() => {
                refetch();
                setShowBalance((prev) => !prev);
              }}
            >
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
