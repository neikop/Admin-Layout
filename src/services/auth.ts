import { client } from './axios';

const login = (body: any): Promise<LoginResponse> => client.post(`/v1/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/v1/auth/register`, body);

const authService = {
  login,
  register,
};
export default authService;
