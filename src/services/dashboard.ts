import { client } from './axios';

const fetchBanks = (params: ParamsType): Promise<BankPaginateType> => client.get(`/api/bank`, { params });
const createBank = (body: BankCreateType): Promise<BankType> => client.post(`/api/bank`, body);
const updateBank = ({ id, ...body }: BankUpdateType): Promise<BankType> => client.put(`/api/bank/${id}`, body);
const deleteBank = ({ id }: { id: string }): Promise<any> => client.delete(`/api/bank/${id}`);

const dashboardService = {
  fetchBanks,
  createBank,
  updateBank,
  deleteBank,
};
export default dashboardService;
