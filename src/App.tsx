import AOS from 'aos';
import jwtDecode from 'jwt-decode';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateLayout } from './layouts';
import AuthLayout from './layouts/authLayout';
import { AppTheme } from './layouts/containers';
import { signIn } from './reducers/profileSlice';
import { store } from './reducers/store';
import { queryClient } from './services';

AOS.init();

const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      jwtDecode(profile.accessToken);
      store.dispatch(signIn(profile));
    } catch {
    } finally {
      setIsReady(true);
    }
  }, [isReady]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          preventDuplicate
          variant='success'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <AppTheme>
            <BrowserRouter>
              {isReady ? (
                <Routes>
                  <Route path='/auth/*' element={<AuthLayout />} />
                  <Route path='/*' element={<PrivateLayout />} />
                </Routes>
              ) : (
                <></>
              )}
            </BrowserRouter>
          </AppTheme>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
