import { client } from './axios';

const login = (body: any): Promise<LoginResponse> => client.post(`/v1/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/v1/auth/register`, body);
const changePassword = (body: any): Promise<any> => client.post(`/v1/auth/change-password`, body);
const getProfile = (): Promise<UserType> => client.get(`/v1/auth/profile`);

const authService = {
  login,
  register,
  changePassword,
  getProfile,
};
export default authService;
