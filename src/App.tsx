import { AppContainer } from 'containers';
import { default as jwtDecode } from 'jwt-decode';
import { AuthLayout, PrivateLayout } from 'layouts';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signIn } from 'reducers/profileSlice';
import { store } from 'reducers/store';
import { authService } from 'services';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      jwtDecode(profile.accessToken);
      store.dispatch(signIn(profile));
      authService.getProfile();
    } catch {
    } finally {
      setIsReady(true);
    }
  }, [isReady]);

  return (
    <Provider store={store}>
      <AppContainer>
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
      </AppContainer>
    </Provider>
  );
};

export default App;
