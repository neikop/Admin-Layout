import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from '../reducers/profileSlice';
import { DesignButton } from './DesignButton';
import React from 'react';

const RegisterSticker = () => {
  const { emailVerified } = useSelector(profileSelector);

  const [isVisible, setVisible] = useState(true);
  const [isOpenRegister, setOpenRegister] = useState(false);

  if (emailVerified || !isVisible) return null;

  return (
    <div className='fixed right-[40px] bottom-[80px] z-50'>
      <div
        className='relative flex items-end w-[94px] h-[140px] sm:w-[122px] sm:h-[160px]'
        style={{
          // background: `url(${require('assets/components/register_sticker.png').default})`,
          backgroundSize: 'cover',
        }}
      >
        <Button
          size='small'
          color='inherit'
          className='absolute top-[-24px] right-0 rounded-full'
          onClick={() => setVisible(false)}
        >
          X
        </Button>
        <DesignButton
          className='text-[10px] sm:text-[14px] min-h-[36px] sm:min-h-[40px]'
          size='small'
          color='secondary'
          onClick={() => setOpenRegister((prev) => !prev)}
        >
          PRE-REGISTER
        </DesignButton>

        <div className='w-full absolute h-[120px]' onClick={() => setOpenRegister((prev) => !prev)}></div>
        <Dialog
          fullWidth
          maxWidth='xs'
          open={isOpenRegister}
          classes={{ container: 'items-start', paper: 'top-[60px]' }}
        >
          {/* <RegisterPopup onClose={() => setOpenRegister(false)} /> */}
        </Dialog>
      </div>
    </div>
  );
};

export default RegisterSticker;
