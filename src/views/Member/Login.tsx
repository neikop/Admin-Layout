import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { InputPassword } from '../../components';
import { signIn } from '../../reducers/profileSlice';
import authRoute from '../../routes/authRoute';
import { authService } from '../../services';

const Login = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(authService.login, {
    onSuccess: (data) => {
      dispatch(
        signIn({
          accessToken: data.tokens.access.token,
          refreshToken: data.tokens.refresh.token,
          incId: data.player.incId,
          balance: data.player.balance,
          username: data.player.username,
        }),
      );
      enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
      reset();
    },
  });
  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutate(values);
    })();
  };
  return (
    <div className='justify-center text-center  min-h-[70vh]'>
      <img className='m-auto my-10' src={require('../../assets/images/logo.png')} alt='logo' loading='lazy' />
      <Box
        sx={{
          background: '#ffffffd1',
          color: '#AFA8EC',
          minHeight: '89vh',
          borderRadius: '25px 25px 0px 0px',
          padding: '20px',
          paddingTop: '20%',
        }}
      >
        <Controller
          defaultValue={'monad'}
          name='username'
          control={control}
          rules={{ required: 'Bắt buộc' }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              required
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                },
              }}
              id='standard-basic'
              placeholder='Tên đăng nhập'
              variant='standard'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          defaultValue={'aa123123'}
          name='password'
          control={control}
          rules={{ required: 'Bắt buộc' }}
          render={({ field, fieldState: { invalid, error } }) => (
            <InputPassword
              {...field}
              fullWidth
              placeholder='Mật khẩu'
              required
              sx={{
                '& .MuiInput-root': {
                  height: 40,
                  marginTop: '20px',
                },
              }}
              variant='standard'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Link className='flex flex-row-reverse' to={authRoute.forgot.url}>
          <Button variant='text'>Quên mật khẩu?</Button>
        </Link>
        <div className='p-5'>
          <LoadingButton
            fullWidth
            variant='contained'
            sx={{
              background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
              borderRadius: '10px',
              padding: '10px',
            }}
            loading={isLoading}
            onClick={handleClickSubmit}
          >
            Đăng nhập
          </LoadingButton>
        </div>
        Bạn chưa có tài khoản?
        <Link className='font-bold text-black' to={authRoute.register.url}>
          {' '}
          Đăng ký ngay
        </Link>
        <div className='text-center p-5 mt-28'>
          <label htmlFor='' className='text-black'>
            Đồng tài trợ bởi:
          </label>
          <div className='flex justify-around mt-7'>
            <img src={require('../../assets/images/vin.png')} alt='vin' loading='lazy' />
            <img src={require('../../assets/images/tech.png')} alt='tech' loading='lazy' />
            <img src={require('../../assets/images/bidv.png')} alt='bidv' loading='lazy' />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
