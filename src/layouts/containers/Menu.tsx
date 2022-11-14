import { ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import { publicRoute } from '../../routes';

const StyledListItem = styled(ListItemButton)({
  borderRadius: 2,
  fontWeight: 400,
  flexDirection: 'column',
  width: '100%',
  color: '#564BA8',
  '&:hover, &.Mui-selected': {
    color: '#1E2843',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
  },
});

const NavItem = ({ path, name, icon }: { path: string; name: string; icon?: any }) => {
  const { pathname } = useLocation();
  const isHome = path === '/';
  return (
    <Link to={path}>
      <StyledListItem selected={isHome ? pathname === path : pathname.startsWith(path)}>
        {icon}
        <label className='text-xs'>{name}</label>
      </StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { home, trend, chat, member, transaction } = publicRoute;

  return (
    <div className='flex justify-around' style={{ maxWidth: 600, width: '100%' }}>
      <NavItem {...trend} />
      <NavItem {...transaction} />
      <NavItem {...home} />
      <NavItem {...member} />
      <NavItem {...chat} />
    </div>
  );
};

export default Menu;
