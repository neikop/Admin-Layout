import Forgot from '../views/Member/Forgot';
import Login from '../views/Member/Login';
import Register from '../views/Member/Register';

const authRoute = {
  login: {
    path: '/dang-nhap',
    url: '/auth/dang-nhap',
    component: Login,
  },
  forgot: {
    path: '/forgot',
    url: '/auth/forgot',
    component: Forgot,
  },
  register: {
    path: '/dang-ky',
    url: '/auth/dang-ky',
    component: Register,
  },
};

export default authRoute;
