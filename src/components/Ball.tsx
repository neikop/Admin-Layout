import { LoadingButtonProps } from '@mui/lab';
const Ball = (props: LoadingButtonProps) => {
  return (
    <div className='flex items-center justify-center rounded-full  ball text-xl font-bold m-auto'>{props.value}</div>
  );
};

export default Ball;
