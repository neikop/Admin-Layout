import { Container } from '@mui/material';

const Maintenance = () => (
  <Container className='flex flex-col items-center gap-4 py-20'>
    {/* <img src={require('assets/images/maintenance.png').default} /> */}
    <div className='font-nomal text-2xl text-info-dark'>OUR SITE IS UNDER MAINTENANCE</div>
    <div className='font-semibold text-sm text-neutral-400 text-center'>
      We sincerely apologize for any inconveniences caused.
      <br />
      We will be back soon!
    </div>
  </Container>
);

export default Maintenance;
