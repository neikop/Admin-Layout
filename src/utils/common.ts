export const formatBalance = (balance?: number) => {
  return (balance ?? 0).toLocaleString();
};
