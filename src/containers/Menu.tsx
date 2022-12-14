import { List, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';
import { privateRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  borderRadius: '12px !important',
  '&.Mui-selected': {
    backgroundColor: 'var(--color-primary-main) !important',
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: 'var(--color-primary-light) !important',
    color: '#fff',
  },
});

const MenuItem = ({ path, name }: { path: string; name?: string }) => {
  const location = useLocation();

  return (
    <Link to={path}>
      <StyledListItem selected={location.pathname.startsWith(path)}>
        <ListItemText classes={{ primary: 'font-medium' }}>{name}</ListItemText>
      </StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { home } = privateRoute;

  return (
    <List className='flex flex-col gap-1'>
      <MenuItem {...home} />
    </List>
  );
};

export default Menu;
