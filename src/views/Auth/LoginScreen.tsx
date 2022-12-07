import { LoadingButton } from '@mui/lab';
import { Paper, TextField } from '@mui/material';
import { InputPassword } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from 'reducers/profileSlice';
import { authRoute } from 'routes';
import { authService } from 'services';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: login, isLoading } = useMutation(authService.login, {
    onSuccess: ({ tokens, player }) => {
      enqueueSnackbar('Đăng nhập thành công');
      dispatch(
        signIn({
          accessToken: tokens.access.token,
          refreshToken: tokens.refresh.token,
          ...player,
        }),
      );
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickSubmit();
    }
  };

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      login(values);
    })();
  };

  return (
    <Paper className='w-[600px] flex flex-col gap-10 p-8'>
      <Controller
        name='username'
        defaultValue=''
        control={control}
        rules={{
          required: 'Tài khoản không được để trống',
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            variant='standard'
            label='Tài khoản'
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name='password'
        defaultValue=''
        control={control}
        rules={{
          required: 'Mật khẩu không được để trống',
        }}
        render={({ field, fieldState: { error } }) => (
          <InputPassword
            {...field}
            fullWidth
            variant='standard'
            label='Mật khẩu'
            onKeyDown={handleKeyDown}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
        Đăng nhập
      </LoadingButton>

      <div className='flex justify-center space-x-2 mt-[-20px]'>
        <span>Bạn chưa có tài khoản?</span>
        <Link className='font-bold hover:text-primary-main' to={authRoute.register.url}>
          Đăng ký ngay
        </Link>
      </div>
    </Paper>
  );
};

export default LoginScreen;
