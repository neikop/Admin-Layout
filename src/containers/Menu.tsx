import { LiveChatWidget } from '@livechat/widget-react';
import { Avatar, ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import { LIVE_CHAT_LICENSE } from 'env';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { privateRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  height: 60,
  fontSize: 12,
  padding: '10px 0px',
  flexDirection: 'column',
  color: '#0008',
  '& img': { opacity: 0.5 },
  '&:hover, &.Mui-selected': {
    color: '#000F',
    '& img': { opacity: 1 },
  },
});

const NavItem = ({ path, name, icon }: { path: string; name: string; icon?: any }) => {
  const { pathname } = useLocation();
  const isHome = path === '/';
  return (
    <Link to={path} className='flex-1'>
      <StyledListItem selected={isHome ? pathname === path : pathname.startsWith(path)}>
        <span className='w-[24px]'>{icon}</span>
        <span className='whitespace-nowrap'>{name}</span>
      </StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { trend, member, transaction } = privateRoute;
  const { incId } = useSelector(profileSelector);

  const [visible, setVisible] = useState<'maximized' | 'minimized' | 'hidden'>('hidden');

  return (
    <div className='flex'>
      <NavItem {...trend} icon={<img src={require('assets/icons/Trend.png')} />} />
      <NavItem {...transaction} icon={<img src={require('assets/icons/Trade.png')} />} />
      <Link to={privateRoute.home.path}>
        <Avatar
          className='w-[48px] h-[48px] mt-[-4px] hover:brightness-90 bg-primary-main'
          style={{ boxShadow: '#0003 0px 4px 8px' }}
        >
          <img src={require('assets/icons/Home.png')} className='w-[22px]' />
        </Avatar>
      </Link>
      <NavItem {...member} icon={<img src={require('assets/icons/User.png')} />} />

      <StyledListItem className='flex-1' onClick={() => setVisible('maximized')}>
        <span className='w-[24px]'>
          <img src={require('assets/icons/Chat.png')} />
        </span>
        <span className='whitespace-nowrap'>Chat</span>
      </StyledListItem>
      <LiveChatWidget
        license={LIVE_CHAT_LICENSE}
        visibility={visible}
        customerName={'ID: ' + incId}
        onVisibilityChanged={({ visibility }) => setVisible(visibility)}
      />
    </div>
  );
};

export default Menu;
