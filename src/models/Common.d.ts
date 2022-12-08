type ParamsType = {
  search?: string;
  page: number;
  size: number;
  orderBy?: string;
  desc?: string | number | boolean;
};

type PaginateType = {
  total: number;
  size: number;
  pages: number;
  currentPage: number;
};

type PopupController = {
  onSuccess?: () => void;
  onClose: () => void;
};

type SearchController = {
  onChange: (search: any) => void;
};
