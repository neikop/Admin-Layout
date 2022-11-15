import { LoginScreen, RegisterScreen } from 'views/Auth';

const authRoute = {
  login: {
    path: '/dang-nhap',
    url: '/auth/dang-nhap',
    component: LoginScreen,
  },
  register: {
    path: '/dang-ky',
    url: '/auth/dang-ky',
    component: RegisterScreen,
  },
};

export default authRoute;
