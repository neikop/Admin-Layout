import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { InputPassword } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { authRoute } from 'routes';
import { authService } from 'services';

const RegisterScreen = () => {
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, watch, reset } = useForm({ mode: 'onChange' });
  const { password } = watch();

  const { mutate: register, isLoading } = useMutation(authService.register, {
    onSuccess: (data) => {
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
      navigator(authRoute.login.url, { replace: true });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      register(values);
    })();
  };

  return (
    <div className='flex-1 flex flex-col gap-[40px] bg-white/0 rounded-t-[24px] px-[24px] py-[36px]'>
      <Controller
        name='username'
        defaultValue=''
        control={control}
        rules={{
          required: 'Tài khoản không được để trống',
          minLength: { value: 6, message: 'Tài khoản có ít nhất 6 ký tự' },
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
          minLength: { value: 6, message: 'Mật khẩu có ít nhất 6 ký tự' },
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
      <Controller
        name='passwordConfirm'
        defaultValue=''
        control={control}
        rules={{
          required: 'Mật khẩu không hợp lệ',
          validate: {
            match: (value) => value === password || 'Mật khẩu không khớp',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <InputPassword
            {...field}
            fullWidth
            variant='standard'
            label='Xác nhận mật khẩu'
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <LoadingButton fullWidth variant='contained' loading={isLoading} onClick={handleClickSubmit}>
        Đăng ký
      </LoadingButton>

      <div className='flex justify-center mt-[-20px]'>
        <Link className='font-bold hover:text-primary-main' to={authRoute.login.url}>
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
