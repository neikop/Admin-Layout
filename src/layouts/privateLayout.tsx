import { AppFooter } from 'containers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';
import { Socket } from 'services/socket';

const PrivateLayout = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      navigator(authRoute.login.url, { replace: true });
    } else {
      new Socket().connect();
    }
  }, [isLoggedIn, navigator]);

  return (
    <main className='flex flex-col'>
      <div style={{ height: `calc(100vh - 100px)` }}>
        <Routes>
          {Object.values(privateRoute).map(({ path, component: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          <Route path='*' element={<Navigate to={privateRoute.home.path} />} />
        </Routes>
      </div>
      <AppFooter />
    </main>
  );
};

export default PrivateLayout;
