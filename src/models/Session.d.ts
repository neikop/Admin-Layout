type StatusSession = 'FINISHED';

type SessionType = {
  id: string;
  incId: number;
  countdown:number;
  totalBet: number;
  status: StatusSession;
  result: string;
  zone: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

type SessionPaginateType = PaginateType & {
  results: SessionType[];
};
