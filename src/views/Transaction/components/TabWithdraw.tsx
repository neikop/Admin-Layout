import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Spinner } from 'components';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { transactionService } from 'services';

const TabWithdraw = () => {
  const { data, isFetching } = useQuery(['transactionService.getWithdraw'], () => transactionService.getWithdraw());

  return (
    <Spinner className='h-full relative' loading={isFetching}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell align='right'>Số tiền</TableCell>
              <TableCell align='right'>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.withdrawals.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{DateTime.fromISO(item.createdAt).toFormat('HH:ss dd/MM/yyyy')}</TableCell>
                <TableCell align='right' className='text-success'>
                  {item.amount}
                </TableCell>
                <TableCell align='right'>
                  {item.status === 'APPROVED' ? (
                    <div className='text-info'>Đã rút</div>
                  ) : item.status === 'REJECTED' ? (
                    <div className='text-error'>Từ chối</div>
                  ) : (
                    <div className='text-neutral'>Chờ</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='absolute inset-0 top-[unset]'>
        <div className='w-full h-[40px] bg-warning-gradient rounded-full'>
          <div className='h-full flex justify-between items-center px-[16px]'>
            <div className='flex gap-1'>
              <span>Tổng số đơn:</span>
              <span className='font-bold'>{data?.totalWithdrawls ?? 0}</span>
            </div>
            <div className='flex gap-1'>
              <span>Lợi nhuận:</span>
              <span className='font-bold'>{data?.totalWithdrawAmount ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Spinner>
  );
};
export default TabWithdraw;
