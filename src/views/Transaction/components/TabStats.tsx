import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PerfectScrollbar, Spinner } from 'components';
import { useQuery } from 'react-query';
import { sessionService } from 'services';
import { formatBalance } from 'utils/common';

const TabStats = () => {
  const { data, isFetching } = useQuery(['sessionService.getGeneralStats'], () => sessionService.getGeneralStats());

  return (
    <Spinner className='h-full relative' loading={isFetching}>
      <PerfectScrollbar style={{ maxHeight: `calc(100vh - 300px)` }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cấp</TableCell>
                <TableCell align='right'>Tổng cược</TableCell>
                <TableCell align='right'>Thưởng</TableCell>
                <TableCell align='right'>Số kỳ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.session.zone}</TableCell>
                  <TableCell align='right'>{item.totalBet}</TableCell>
                  <TableCell align='right'>{item.totalWinnings}</TableCell>
                  <TableCell align='right'>{item.session.incId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>

      <div className='absolute inset-0 top-[unset]'>
        <div className='w-full h-[40px] bg-secondary-gradient rounded-full'>
          <div className='h-full flex justify-between items-center px-[16px]'>
            <div className='flex gap-1'>
              <span>Tổng số đơn:</span>
              <span className='font-bold'>{data?.totalResults ?? 0}</span>
            </div>
            <div className='flex gap-1'>
              <span>Lợi nhuận:</span>
              <span className='font-bold'>{formatBalance(data?.totalWinnings)}</span>
            </div>
          </div>
        </div>
      </div>
    </Spinner>
  );
};
export default TabStats;
