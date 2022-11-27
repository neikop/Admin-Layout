import {
  Avatar,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CloseButton } from 'components';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { sessionService } from 'services';
import { formatBalance } from 'utils/common';

type PopupProps = PopupController & {
  id: string;
};

const PopupStatInfo = ({ onClose, id }: PopupProps) => {
  const { ...profile } = useSelector(profileSelector);
  const { data: stat, isSuccess } = useQuery(['authService.getInfoStat', id], () => sessionService.getInfoStat({ id }));

  if (!isSuccess) return <></>;
  return (
    <>
      <CloseButton onClick={onClose} />
      <DialogTitle>Chi tiết kỳ</DialogTitle>
      <DialogContent className='flex flex-col p-0'>
        <div className='flex-1 flex flex-col items-stretch space-y-4 bg-white/80 rounded-t-[24px] p-[12px]'>
          <div className='flex justify-center'>
            <span className='bg-primary-gradient rounded-full text-[24px] font-medium px-4 py-1'>{stat.incId}</span>
          </div>
          <div className='flex justify-between'>
            <div>Thời gian</div>
            <div>{DateTime.fromISO(stat.endTime).toFormat('dd/MM/yyyy hh:mm:ss')}</div>
          </div>
          <div className='flex justify-between'>
            <div>ID người chơi</div>
            <div>{profile.incId}</div>
          </div>
          <div className='flex justify-between'>
            <div>Cấp độ</div>
            <div>{stat.zone}</div>
          </div>
          <div className='flex justify-between'>
            <div>Kết quả mở thưởng</div>
            <div className='inline-flex space-x-1'>
              {stat.result.split('').map((number, index) => (
                <Avatar key={index} className='bg-secondary-gradient text-sm w-[24px] h-[24px]'>
                  {number}
                </Avatar>
              ))}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='bg-secondary-gradient rounded-full flex items-center px-4 pt-2 pb-3 my-4'>
              <div className='text-center px-4'>
                <div className='text-[24px] font-bold'>{stat.totalBet}</div>
                <div className='text-sm'>Tổng cược</div>
              </div>
              <Divider orientation='vertical' className='border-white/40 border-r-2 h-[80%]' />
              <div className='text-center px-4'>
                <div className='text-[24px] font-bold'>{stat.totalWinnings}</div>
                <div className='text-sm'>Tổng thắng</div>
              </div>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Loại</TableCell>
                  <TableCell align='right'>Mệnh giá</TableCell>
                  <TableCell align='right'>Thưởng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stat.bets.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.gate}</TableCell>
                    <TableCell align='right'>{formatBalance(item.amount)}</TableCell>
                    <TableCell align='right'>{formatBalance(item.winnings)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DialogContent>
    </>
  );
};

export default PopupStatInfo;
