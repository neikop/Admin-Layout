import { LoadingButton } from '@mui/lab';
import { Paper, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputPassword } from 'components';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authRoute } from 'routes';
import { authService } from 'services';

const RegisterScreen = () => {
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const { password } = watch();

  const { mutate: register, isLoading } = useMutation(authService.register, {
    onSuccess: () => {
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
      navigator(authRoute.login.url, { replace: true });
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      register(values);
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

      <div className='flex justify-center space-x-2 mt-[-20px]'>
        <span>Đã có tài khoản?</span>
        <Link className='font-bold hover:text-primary-main' to={authRoute.login.url}>
          Đăng nhập
        </Link>
      </div>
    </Paper>
  );
};

export default RegisterScreen;
