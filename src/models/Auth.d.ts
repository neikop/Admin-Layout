type UserType = {
  id?: string;
  incId?: number;
  username?: string;
  balance?: number;
  active?: boolean;
  totalWinnings?: number;
  totalLoss?: number;
  totalBonus?: number;
  totalBet?: number;
  totalDeposit?: number;
  totalWithdrawal?: number;
};

type LoginResponse = {
  tokens: {
    access: { token: string };
    refresh: { token: string };
  };
  player: UserType;
};
