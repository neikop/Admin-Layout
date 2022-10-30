import { } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import authRoute from '../../routes/authRoute';
import { authService } from '../../services';

const Forgot = () => {
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(authService.login, {
    onSuccess: () => {
      reset();
    },
  });
  const handleClickSubmit = () => {
    handleSubmit((values) => {
      console.log(values);
      mutate(values);
    })();
  };
  return (
    <div className='p-5 justify-center text-center min-h-[70vh]'>
      <img className='m-auto my-10' src={require('../../assets/images/logo.png')} alt='logo' loading='lazy' />
      <Controller
        defaultValue={''}
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
      <div className='p-5'>
        <LoadingButton fullWidth variant='contained' color='secondary' loading={isLoading} onClick={handleClickSubmit}>
          Send OTP
        </LoadingButton>
      </div>
      <Link to={authRoute.login.url}>
        <LoadingButton className='px-4'>Đăng nhập ngay</LoadingButton>
      </Link>
    </div>
  );
};

export default Forgot;
