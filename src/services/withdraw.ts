import { client } from './axios';

const getWithdraw = (params?: any): Promise<WithdrawPaginateType> => client.get(`v1/withdrawals`, { params });
const getDeposit = (params?: any): Promise<DepositPaginateType> => client.get(`v1/deposits`, { params });

const createWithdraw = (body: any): Promise<DepositPaginateType> => client.post(`v1/withdrawals`, body);
const updateBank = ({ playerId, body }: any): Promise<any> => client.patch(`v1/players/${playerId}/bank-account`, body);

const transactionService = {
  updateBank,
  createWithdraw,
  getWithdraw,
  getDeposit,
};
export default transactionService;
