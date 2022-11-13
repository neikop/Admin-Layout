import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { profileSelector } from '../reducers/profileSlice';
import { publicRoute } from '../routes';
import authRoute from '../routes/authRoute';
import { AppController } from './containers';

const AuthLayout = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      navigator(publicRoute.home.path, { replace: true });
    }
  }, [isLoggedIn, navigator]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, dispatch]);

  return (
    <>
      <main className='overflow-hidden'>
        <AppController>
          <Routes>
            {Object.values(authRoute).map(({ path, component: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path='/*' element={<Navigate to={authRoute.login.path} />} />
          </Routes>
        </AppController>
      </main>
    </>
  );
};

export default AuthLayout;
