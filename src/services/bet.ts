// import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'models/Auth';
import { client } from './axios';

const getBet = (params: any): Promise<any> => client.get(`v1/bets`, { params });
const bet = (body: any): Promise<any> => client.post(`v1/bets`, body);
const betService = {
  bet,
  getBet,
};
export default betService;
