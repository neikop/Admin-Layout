import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { AppBar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppMenu } from '.';
import { profileSelector } from '../../reducers/profileSlice';

const Header = () => {
  const location = useLocation();
  const { balance, incId } = useSelector(profileSelector);

  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    // setShowMenu(false);
  }, [location]);

  return (
    <AppBar position='fixed' sx={{ top: 'auto', bottom: 0, alignItems: 'center', background: 'white' }} elevation={0}>
      <div className='balance'>
        <div>Số dư tài khoản ID: {incId}</div>
        <div>
          {showBalance ? balance : '*******'}
          <IconButton onClick={() => setShowBalance((prev) => !prev)}>
            {showBalance ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
          </IconButton>
        </div>
      </div>
      <AppMenu />
    </AppBar>
  );
};

export default Header;
