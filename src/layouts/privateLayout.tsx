import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { profileSelector } from '../reducers/profileSlice';
import { publicRoute } from '../routes';
import authRoute from '../routes/authRoute';
import { Socket } from '../services/socket';
import { AppController, AppHeader } from './containers';

const PrivateLayout = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigator(authRoute.login.url, { replace: true });
    } else {
      const socket = new Socket();
      socket.connect();
    }
  }, [isLoggedIn, navigator]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, dispatch]);

  return (
    <>
      <AppHeader />
      <main className='overflow-hidden'>
        <AppController>
          <Routes>
            {Object.values(publicRoute)
              .filter(({ requiredLogin }: any) => !requiredLogin || isLoggedIn)
              .map(({ path, component: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            <Route path='*' element={<Navigate to={publicRoute.home.path} />} />
          </Routes>
        </AppController>
      </main>
    </>
  );
};

export default PrivateLayout;
