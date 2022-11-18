type StatusTransation = 'SUCCESS' | 'APPROVED' | 'REJECTED';

type TransactionType = {
  id: string;
  status: StatusTransation;
  amount: number;
  player: string;
  notification: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

type DepositPaginateType = {
  deposits: TransactionType[];
  totalDeposits: number;
  totalDepositAmount: number;
};

type WithdrawPaginateType = {
  withdrawals: TransactionType[];
  totalWithdrawls: number;
  totalWithdrawAmount: number;
};

type StatType = {
  session: SessionType;
  totalBet: number;
  totalWinnings: number;
};

type BetType = {
  id: string;
  amount: number;
  winnings: number;
  game: string;
  gate: string;
};

type StatInfo = {
  id: string;
  totalBet: number;
  totalWinnings: number;
  incId: number;
  status: StatusSession;
  result: string;
  zone: ZoneType;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  bets: BetType[];
};

type StatsPagniateType = {
  results: StatType[];
  totalResults: number;
  totalWinnings: number;
};
