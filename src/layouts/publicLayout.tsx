import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { profileSelector } from '../reducers/profileSlice';
import { publicRoute } from '../routes';
import authRoute from '../routes/authRoute';
import { AppController, AppHeader } from './containers';

const PublicLayout = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) {
      navigator(authRoute.login.url, { replace: true });
    }
  }, [isLoggedIn, navigator]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, dispatch]);

  return (
    <>
      <AppHeader />
      <main className='overflow-hidden' style={{ color: '#F4F1EA', marginBottom: '100px' }}>
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

export default PublicLayout;
