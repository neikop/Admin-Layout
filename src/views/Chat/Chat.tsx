import { LiveChatWidget } from '@livechat/widget-react';
import { Button } from '@mui/material';
import { Spinner } from 'components';
import { LIVE_CHAT_LICENSE } from 'env';
import { useState } from 'react';

type VisibilityType = 'maximized' | 'minimized' | 'hidden';
const isLicense = !!LIVE_CHAT_LICENSE;

const Chat = () => {
  const [isReady, setIsReady] = useState(!isLicense);
  const [visible, setVisible] = useState<VisibilityType>('maximized');

  return (
    <div className='h-full flex flex-col'>
      <div className='h-[60px] flex justify-center items-center'>
        <span className='font-bold text-xl'>Trung tâm hỗ trợ</span>
      </div>
      <Spinner className='my-20' loading={!isReady}>
        <div className='flex justify-center'>
          {visible === 'hidden' ? (
            <Button variant='contained' color='secondary' onClick={() => setVisible('maximized')}>
              Liên hệ CSKH
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Spinner>

      {isLicense ? (
        <LiveChatWidget
          license={LIVE_CHAT_LICENSE!}
          visibility={visible}
          onReady={() => setIsReady(true)}
          onVisibilityChanged={({ visibility }) => setVisible(visibility)}
        />
      ) : (
        <div className='text-center text-error'>Missing Live Chat License</div>
      )}
    </div>
  );
};

export default Chat;
