import AOS from 'aos';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts';
import AuthLayout from './layouts/authLayout';
import { AppTheme } from './layouts/containers';
import { store } from './reducers/store';
import { queryClient } from './services';

AOS.init();

const App = () => {
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
              <Routes>
                <Route path='/auth/*' element={<AuthLayout />} />
                <Route path='/*' element={<PublicLayout />} />
              </Routes>
            </BrowserRouter>
          </AppTheme>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
