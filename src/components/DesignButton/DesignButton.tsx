import { LoadingButtonProps } from '@mui/lab';
const DesignButton = (props: LoadingButtonProps) => {
  return (
    <div className='relative'>
      {/* <LoadingButton
        variant='contained'
        size='large'
        classes={{
          contained: styles.contained,
          containedInfo: styles.containedInfo,
          containedPrimary: styles.containedPrimary,
          containedSecondary: styles.containedSecondary,
          disabled: styles.disabled,
        }}
        {...props}
      /> */}
      <div>{props.name}</div>
    </div>
  );
};

export default DesignButton;
