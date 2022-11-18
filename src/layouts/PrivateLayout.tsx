import { Dialog } from '@mui/material';
import { AppFooter } from 'containers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { systemSelector } from 'reducers/systemSlice';
import { authRoute, privateRoute } from 'routes';
import { Socket } from 'utils/socket';
import { PopupAlert } from 'views/Home/components';

const PrivateLayout = () => {
  const navigator = useNavigate();
  const { isReady } = useSelector(systemSelector);
  const { isLoggedIn } = useSelector(profileSelector);

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new Socket();
    if (!isLoggedIn) {
      socket.disconnect();
      navigator(authRoute.login.url, { replace: true });
    } else {
      socket.connect();
      socket.instance().on('NOTIFICATION', (data: NotificationType) => {
        setOpenAlert(true);
        setMessage(data.content);
      });
    }
  }, [isLoggedIn, navigator]);

  return (
    <main className='flex flex-col'>
      <div style={{ height: `calc(100vh - 100px)` }}>
        {isReady ? (
          <Routes>
            {Object.values(privateRoute).map(({ path, component: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path='*' element={<Navigate to={privateRoute.home.path} />} />
          </Routes>
        ) : (
          <></>
        )}
      </div>
      <AppFooter />

      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <PopupAlert onClose={() => setOpenAlert(false)} message={message} />
      </Dialog>
    </main>
  );
};

export default PrivateLayout;
