import { Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Spinner } from 'components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { sessionService } from 'services';
import { formatBalance } from 'utils/common';
import { PopupStatInfo } from '.';

const TabStats = () => {
  const { data, isFetching } = useQuery(['sessionService.getGeneralStats'], () => sessionService.getGeneralStats());

  const [openInfo, setOpenInfo] = useState(false);
  const [selectId, setSelectId] = useState('');
  const isLong = Number(data?.results.length) > 10;

  return (
    <Spinner loading={isFetching}>
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
              <TableRow
                key={index}
                className='cursor-pointer'
                onClick={() => {
                  setOpenInfo(true);
                  setSelectId(item.session.id);
                }}
              >
                <TableCell>{item.session.zone}</TableCell>
                <TableCell align='right'>{formatBalance(item.totalBet)}</TableCell>
                <TableCell align='right'>{formatBalance(item.totalWinnings)}</TableCell>
                <TableCell align='right'>{item.session.incId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openInfo} fullScreen>
        <PopupStatInfo id={selectId} onClose={() => setOpenInfo(false)} />
      </Dialog>

      <div
        className='pt-[8px] inset-0 top-[unset] bottom-[100px] max-w-[600px] mx-auto'
        style={{
          backgroundColor: '#F5F5F5',
          position: isLong ? 'fixed' : 'static',
          padding: isLong ? 8 : 0,
        }}
      >
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
