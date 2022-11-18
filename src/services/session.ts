import { client } from './axios';

const getSessions = (params: any): Promise<SessionPaginateType> => client.get(`v1/sessions`, { params });
const getGeneralStats = (): Promise<StatsPagniateType> => client.get(`v1/sessions/stats`);
const getInfoStat = ({ id }: { id: string }): Promise<StatInfo> => client.get(`v1/sessions/${id}/stats`);

const sessionService = {
  getSessions,
  getGeneralStats,
  getInfoStat,
};
export default sessionService;
