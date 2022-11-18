import { client } from './axios';

const login = (body: any): Promise<LoginResponse> => client.post(`/v1/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/v1/auth/register`, body);
const getProfile = (): Promise<UserType> => client.get(`/v1/auth/profile`);

const authService = {
  login,
  register,
  getProfile,
};
export default authService;
