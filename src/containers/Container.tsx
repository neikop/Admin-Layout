import { QueryClientProvider } from '@tanstack/react-query';
import { AppTheme } from 'containers';
import { default as jwtDecode } from 'jwt-decode';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'reducers/profileSlice';
import { queryClient } from 'services';

type ContainerType = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerType) => {
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      const { exp } = jwtDecode(profile.accessToken) as any;
      if (Date.now() / 1000 < exp - 600) {
        jwtDecode(profile.accessToken);
        dispatch(signIn(profile));
      }
    } catch {
    } finally {
      setIsReady(true);
    }
  }, [dispatch]);

  return (
    <SnackbarProvider
      preventDuplicate={false}
      autoHideDuration={3000}
      variant='success'
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <QueryClientProvider client={queryClient}>
        <AppTheme>{isReady ? children : null}</AppTheme>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default Container;
