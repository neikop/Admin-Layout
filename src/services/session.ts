// import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'models/Auth';
import { client } from './axios';

const getSessions = (params: any): Promise<any> => client.get(`v1/sessions`, { params });
const getSessionById = (id: string): Promise<any> => client.get(`v1/sessions/${id}`);
const getStatsById = (sessionId: string): Promise<any> => client.get(`v1/sessions/${sessionId}/stats`);
const getGeneralStats = (): Promise<any> => client.get(`v1/sessions/stats`);
const sessionService = {
  getSessions,
  getSessionById,
  getStatsById,
  getGeneralStats,
};
export default sessionService;
