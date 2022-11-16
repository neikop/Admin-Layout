import { LiveChatWidget } from '@livechat/widget-react';
import { Button } from '@mui/material';
import { Spinner } from 'components';
import { useState } from 'react';

type VisibilityType = 'maximized' | 'minimized' | 'hidden';

const Chat = () => {
  const [isReady, setIsReady] = useState(false);
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

      <LiveChatWidget
        license={process.env.REACT_APP_LIVE_CHAT_LICENSE! ?? '14395797'}
        visibility={visible}
        onReady={() => setIsReady(true)}
        onVisibilityChanged={({ visibility }) => setVisible(visibility)}
      />
    </div>
  );
};

export default Chat;
