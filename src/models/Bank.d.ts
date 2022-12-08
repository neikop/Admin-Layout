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

type BankPaginateType = PaginateType & {
  items: BankType[];
};
