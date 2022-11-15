import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
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
    onSuccess: (data) => {
      enqueueSnackbar('Đăng nhập thành công');
      dispatch(
        signIn({
          accessToken: data.tokens.access.token,
          refreshToken: data.tokens.refresh.token,
          incId: data.player.incId,
          balance: data.player.balance,
          username: data.player.username,
        }),
      );
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      login(values);
    })();
  };

  return (
    <div className='flex-1 flex flex-col gap-[40px] bg-white/80 rounded-t-[24px] px-[24px] py-[36px]'>
      <Controller
        name='username'
        defaultValue='monad'
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
        defaultValue='aa123123'
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
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
        Đăng nhập
      </LoadingButton>

      <div className='flex justify-center gap-2 mt-[-20px]'>
        <span>Bạn chưa có tài khoản?</span>
        <Link className='font-bold hover:text-primary-main' to={authRoute.register.url}>
          Đăng ký ngay
        </Link>
      </div>

      <div className='flex flex-wrap justify-center mt-[20px] gap-[12px] sm:gap-[20px]'>
        <img src={require('assets/icons/Techcombank-logo.png')} className='h-[40px] sm:h-[60px]' />
        <img src={require('assets/icons/BIDV-logo.png')} className='h-[40px] sm:h-[60px]' />
        <img src={require('assets/icons/Vingroup-logo.png')} className='h-[40px] sm:h-[60px]' />
      </div>
    </div>
  );
};

export default LoginScreen;
