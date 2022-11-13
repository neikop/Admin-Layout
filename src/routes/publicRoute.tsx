import HomeIcon from '@mui/icons-material/Home';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Chat } from '../views/Chat';
import { Home } from '../views/Home';
import { Member } from '../views/Member';
import { Trend } from '../views/Trend';
import { Transaction } from '../views/Transaction';

const publicRoute = {
  home: {
    path: '/',
    name: 'Home',
    component: Home,
    icon: <HomeIcon />,
  },
  trend: {
    path: '/xu-huong',
    name: 'Xu hướng',
    icon: <TrendingUpIcon />,
    component: Trend,
  },
  member: {
    path: '/thanh-vien',
    name: 'Thành viên',
    icon: <PersonOutlineIcon />,
    component: Member,
    requiredLogin: true,
  },
  transaction: {
    path: '/giao-dich',
    name: 'Giao dịch',
    icon: <SyncAltIcon />,
    component: Transaction,
    requiredLogin: true,
  },
  chat: {
    path: '/chat',
    name: 'Chat',
    icon: <MessageSharpIcon />,
    component: Chat,
    requiredLogin: true,
  },
  // marketplace: {
  //   path: '/marketplace',
  //   name: 'Marketplace',
  //   component: Marketplace,
  // },
  // metaverse: {
  //   path: '/metaverse',
  //   name: 'Metaverse',
  //   component: Metaverse,
  // },
  // metaverseEvent: {
  //   path: '/metaverse/:id',
  //   url: ({ id }: { id: string }) => `/metaverse/${id}`,
  //   component: MetaverseEvent,
  // },
  // itemView: {
  //   path: '/items/:tokenId',
  //   url: ({ tokenId }: { tokenId: string }) => `/items/${tokenId}`,
  //   component: ItemView,
  // },

  // profile: {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   requiredLogin: true,
  // },
  // inventory: {
  //   path: '/inventory',
  //   name: 'Inventory',
  //   component: Inventory,
  //   requiredLogin: true,
  // },
};

export default publicRoute;
