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
      <main className='overflow-hidden' style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
        <AppController>
          <Routes>
            {Object.values(authRoute).map(({ path, component: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path='/*' element={<Navigate to={authRoute.login.path} />} />
          </Routes>
        </AppController>
        <div className='text-center p-5'>
          <label htmlFor=''>Đồng tài trợ bởi:</label>
          <div className='flex justify-around mt-7'>
            <img src={require('../assets/images/vin.png')} alt='vin' loading='lazy' />
            <img src={require('../assets/images/tech.png')} alt='tech' loading='lazy' />
            <img src={require('../assets/images/bidv.png')} alt='bidv' loading='lazy' />
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
