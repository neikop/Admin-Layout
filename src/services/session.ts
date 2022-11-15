import { client } from './axios';

const getSessions = (params: any): Promise<SessionPaginateType> => client.get(`v1/sessions`, { params });
const getGeneralStats = (): Promise<StatsPagniateType> => client.get(`v1/sessions/stats`);

const sessionService = {
  getSessions,
  getGeneralStats,
};
export default sessionService;
