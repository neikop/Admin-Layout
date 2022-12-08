import { client } from './axios';

const fetchBanks = (params: ParamsType): Promise<BankPaginateType> => client.get(`/api/bank`, { params });
const createBank = (body: BankCreateType): Promise<BankType> => client.post(`/api/bank`, body);

const dashboardService = {
  fetchBanks,
  createBank,
};
export default dashboardService;
