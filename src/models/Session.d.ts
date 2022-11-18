type StatusSession = 'FINISHED';
type ZoneType = 'LEVEL_1' | 'LEVEL_3' | 'LEVEL_5';

type SessionType = {
  id: string;
  incId: number;
  countdown: number;
  totalBet: number;
  status: StatusSession;
  result: string;
  zone: ZoneType;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

type SessionPaginateType = PaginateType & {
  results: SessionType[];
};
