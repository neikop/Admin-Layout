import { Chat } from 'views/Chat';
import { Home } from 'views/Home';
import { Member } from 'views/Member';
import { Transaction } from 'views/Transaction';
import { Trend } from 'views/Trend';

const privateRoute = {
  home: {
    path: '/',
    name: 'Home',
    component: Home,
  },
  trend: {
    path: '/xu-huong',
    name: 'Xu hướng',
    component: Trend,
  },
  member: {
    path: '/thanh-vien',
    name: 'Thành viên',
    component: Member,
  },
  transaction: {
    path: '/giao-dich',
    name: 'Giao dịch',
    component: Transaction,
  },
  chat: {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
};

export default privateRoute;
