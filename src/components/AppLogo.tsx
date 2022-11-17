import { Avatar } from '@mui/material';
import { WEB_TITLE } from 'env';

const AppLogo = ({ size = 44 }: { size?: number }) => {
  const A = WEB_TITLE.charAt(0);
  return (
    <Avatar
      className='font-[Lemonada] bg-primary-main text-white'
      style={{ fontSize: size - 4, width: size, height: size }}
    >
      {A}
    </Avatar>
  );
};

export default AppLogo;
