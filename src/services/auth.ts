// import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'models/Auth';
import { client } from './axios';

const getNonce = (params: any): Promise<any> => client.get(`/account-apis/api/authentication/nonce`, { params });
const getToken = (body: any): Promise<any> => client.post(`/account-apis/api/authentication/token`, body);
const login = (body: any): Promise<any> => client.post(`/v1/auth/login`, body);
const register = (body: any): Promise<any> => client.post(`/v1/auth/register`, body);
const forgot = (body: any): Promise<any> => client.post(`/account-apis/api/authentication/token`, body);
const authService = {
  getNonce,
  getToken,
  login,
  register,
  forgot,
};
export default authService;
