// import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'models/Auth';
import { client } from './axios';

const login = (body: any): Promise<any> => client.post(`/v1/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/v1/auth/register`, body);
const forgot = (body: any): Promise<any> => client.post(`/v1/auth/forgot`, body);
const authService = {
  login,
  register,
  forgot,
};
export default authService;
