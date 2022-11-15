type PaginateType = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type PopupController = {
  onSuccess?: () => void;
  onClose: () => void;
};
