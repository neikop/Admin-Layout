import { AppLogo } from 'components';
import { WEB_TITLE } from 'env';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';

const AuthLayout = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      navigator(privateRoute.home.path, { replace: true });
    }
  }, [isLoggedIn, navigator]);

  return (
    <main className='flex flex-col'>
      <div className='h-[120px] flex justify-center items-center gap-2'>
        <AppLogo />
        <span className='font-[Lemonada] text-[32px]'>{WEB_TITLE}</span>
      </div>
      <Routes>
        {Object.values(authRoute).map(({ path, component: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path='/*' element={<Navigate to={authRoute.login.path} />} />
      </Routes>
    </main>
  );
};

export default AuthLayout;
