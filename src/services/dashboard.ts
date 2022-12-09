import { client } from './axios';

const fetchBanks = (params: ParamsType): Promise<BankPaginateType> => client.get(`/api/bank`, { params });
const createBank = (body: BankCreateType): Promise<BankType> => client.post(`/api/bank`, body);
const updateBank = (id: string, body: BankCreateType): Promise<BankType> => client.put(`/api/bank/${id}`, body);

const dashboardService = {
  fetchBanks,
  createBank,
  updateBank,
};
export default dashboardService;
