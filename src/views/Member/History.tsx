import {} from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from 'components';

const History = ({ onClose }: any) => {
  return (
    <>
      <DialogTitle className='text-center'>Lịch sử tham gia</DialogTitle>
      <DialogContent>
        <table className='w-full text-lg'>
          <thead>
            <tr>
              <th className='bg-info text-center text-lg font-normal'>Level</th>
              <th className='bg-info text-center text-lg font-normal'>Tổng cược</th>
              <th className='bg-info text-center text-lg font-normal'>Thưởng</th>
              <th className='bg-info text-center text-lg font-normal'>Số kỳ</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr
            className="h-[42px] border-t border-white bg-dove-s-wing text-center"
          >
            <td>{{ statistic.session.zone }}</td>
            <td>{{ statistic.totalBet }}</td>
            <td className="text-mee-hua-sunset">+{{ statistic.totalWinnings }}</td>
          </tr> */}
          </tbody>
        </table>
      </DialogContent>

      <CloseButton onClick={onClose} />
    </>
  );
};

export default History;
