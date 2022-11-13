import {} from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from '../../components';

const Deposit = ({ onClose }: any) => {
  return (
    <>
      <DialogTitle className='text-center'>{process.env.REACT_APP_SITE_TITLE?.toUpperCase()}</DialogTitle>
      <DialogContent className='item-center mt-28 text-center'>Vui lòng liên hệ admin để được hỗ trợ!</DialogContent>
      <CloseButton onClick={onClose} />
    </>
  );
};

export default Deposit;
