import { LoadingButtonProps } from '@mui/lab';
const Ball = (props: LoadingButtonProps) => {
  return (
    <div className='mx-3 relative flex items-center justify-center rounded-full text-32 text-carbon ball text-3xl font-black text-black'>
      {props.value}
    </div>
  );
};

export default Ball;
