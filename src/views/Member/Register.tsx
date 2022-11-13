import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { InputPassword } from '../../components';
import authRoute from '../../routes/authRoute';
import { authService } from '../../services';

const Register = () => {
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset, watch } = useForm({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(authService.register, {
    onSuccess: () => {
      navigator(authRoute.login.url, { replace: true });
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });
  const { password } = watch();
  const handleClickSubmit = () => {
    handleSubmit((values) => {
      delete values.repassword;
      mutate(values);
    })();
  };
  return (
    <div className='p-5 justify-center text-center min-h-[70vh]'>
      <img className='m-auto my-10' src={require('../../assets/images/logo.png')} alt='logo' loading='lazy' />
      <Controller
        name='username'
        defaultValue={''}
        control={control}
        rules={{ required: 'Bắt buộc', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } }}
        render={({ field, fieldState: { invalid, error } }) => (
          <TextField
            {...field}
            fullWidth
            required
            placeholder='Tên đăng nhập'
            sx={{
              '& .MuiInput-root': {
                height: 40,
              },
            }}
            variant='standard'
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        defaultValue={''}
        name='password'
        control={control}
        rules={{ required: 'Bắt buộc', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } }}
        render={({ field, fieldState: { invalid, error } }) => (
          <InputPassword
            {...field}
            fullWidth
            placeholder='Mật khẩu'
            sx={{
              '& .MuiInput-root': {
                height: 40,
                marginTop: '20px',
              },
            }}
            required
            variant='standard'
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name='repassword'
        defaultValue={''}
        control={control}
        rules={{
          required: 'Bắt buộc',
          validate: {
            match: (value) => value === password || 'Mật khẩu không khớp',
          },
        }}
        render={({ field, fieldState: { invalid, error } }) => (
          <InputPassword
            {...field}
            fullWidth
            placeholder='Nhập lại mật khẩu'
            required
            variant='standard'
            sx={{
              '& .MuiInput-root': {
                height: 40,
                marginTop: '20px',
              },
            }}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
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
          Đăng ký
        </LoadingButton>
      </div>
      <Link to={authRoute.login.url}>
        <LoadingButton>Đăng nhập ngay</LoadingButton>
      </Link>
    </div>
  );
};

export default Register;
