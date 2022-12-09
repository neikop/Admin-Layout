type BankType = BankCreateType & {
  id: string;
  updatedAt: string;
  createdAt: string;
};

type BankCreateType = {
  customerId: string;
  numberBank: string;
  note: string;
};

type BankUpdateType = BankCreateType & {
  id: string;
};

type BankPaginateType = PaginateType & {
  items: BankType[];
};
