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

type StatsType = {
  session: SessionType;
  totalBet: number;
  totalWinnings: number;
};

type StatsPagniateType = {
  results: StatsType[];
  totalResults: number;
  totalWinnings: number;
};
