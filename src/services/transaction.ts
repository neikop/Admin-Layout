import { client } from './axios';

const getDeposit = (params?: any): Promise<DepositPaginateType> => client.get(`v1/deposits`, { params });
const getWithdraw = (params?: any): Promise<WithdrawPaginateType> => client.get(`v1/withdrawals`, { params });

const createBet = (body: any): Promise<any> => client.post(`v1/bets`, body);
const createWithdraw = (body: any): Promise<any> => client.post(`v1/withdrawals`, body);
const updateBank = ({ playerId, body }: any): Promise<any> => client.patch(`v1/players/${playerId}/bank-account`, body);

const transactionService = {
  getDeposit,
  getWithdraw,

  createBet,
  createWithdraw,
  updateBank,
};
export default transactionService;
