import { List, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';
import { privateRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  borderRadius: '8px !important',
  '&.Mui-selected': {
    backgroundColor: 'var(--color-primary-main) !important',
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: 'var(--color-primary-light) !important',
    color: '#fff',
  },
  marginBottom: '8px !important',
});

type SubMenuType = {
  name?: string | JSX.Element;
  path: string;
};

type MenuItemProps = {
  name?: string | JSX.Element;
  path: string;
  items?: SubMenuType[];
};

const MenuItem = ({ name, path, items }: MenuItemProps) => {
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
    <>
      <List className='flex flex-col gap-1'>
        <MenuItem {...home} />
      </List>
    </>
  );
};

export default Menu;
