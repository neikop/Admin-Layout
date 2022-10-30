import { ListItemButton } from '@mui/material';
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
    color: '#FC33A3',
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
        {name}
      </StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { home, trend, chat, member } = publicRoute;

  return (
    <div className='flex justify-around' style={{ maxWidth: 600, width: '100%', backgroundColor: '#1E2843' }}>
      <NavItem {...home} />
      <NavItem {...trend} />
      <NavItem {...member} />
      <NavItem {...chat} />
    </div>
  );
};

export default Menu;
