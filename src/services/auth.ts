import { client } from './axios';

const login = (body: any): Promise<LoginResponse> => client.post(`/api/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/api/auth/register`, body);

const authService = {
  login,
  register,
};
export default authService;
