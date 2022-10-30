import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
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
    <div className='p-5 justify-center text-center min-h-[70vh]'>
      <img className='m-auto my-10' src={require('../../assets/images/logo.png')} alt='logo' loading='lazy' />
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
        <LoadingButton fullWidth variant='contained' color='secondary' loading={isLoading} onClick={handleClickSubmit}>
          Đăng nhập
        </LoadingButton>
      </div>
      <Link to={authRoute.register.url}>
        <LoadingButton>Đăng ký ngay</LoadingButton>
      </Link>
    </div>
  );
};

export default Login;
