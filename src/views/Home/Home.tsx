import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Box, Grid, IconButton, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Countdown from 'react-countdown';
import { a11yProps, Ball, TabPanel } from '../../components';

const Home = () => {
  const { id, result, nextPeriod } = { id: '1', result: '96813', nextPeriod: 2 };
  const tonghoa = [
    { stt: 0, value: 123 },
    { stt: 1, value: 123 },
    { stt: 2, value: 123 },
    { stt: 3, value: 123 },
    { stt: 4, value: 123 },
    { stt: 5, value: 123 },
    { stt: 6, value: 123 },
    { stt: 7, value: 123 },
    { stt: 8, value: 123 },
    { stt: 9, value: 123 },
    { stt: 10, value: 123 },
    { stt: 11, value: 123 },
    { stt: 12, value: 123 },
    { stt: 13, value: 123 },
    { stt: 14, value: 123 },
    { stt: 15, value: 123 },
    { stt: 16, value: 123 },
    { stt: 17, value: 123 },
    { stt: 18, value: 123 },
    { stt: 19, value: 123 },
  ];
  const [currentZone, setCurrentZone] = useState(0);
  const changeCurrentZone = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentZone(newValue);
  };
  const [currentGame, setCurrentGame] = useState(0);
  const changeCurrentGame = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentGame(newValue);
  };
  return (
    <div className='pt-3 leading-8'>
      <Box className='flex px-3 justify-between'>
        <img className='' src={require('../../assets/images/icon.png')} alt='logo' loading='lazy' />
        <label className='text-white text-xl font-normal'>Kết quả kỳ {id} hôm nay</label>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      <Box className='flex my-3 justify-center'>
        {result.split('').map((value) => (
          <Ball className='mx-3' key={value} value={value}></Ball>
        ))}
      </Box>
      <Box className='flex px-3 py-1 justify-between' style={{ background: '#1E2843' }}>
        <label className='text-white' htmlFor='h1'>
          Kỳ tiếp theo: {nextPeriod}
        </label>
        <Box className='content-center justify-self-auto'>
          <AccessTimeOutlinedIcon style={{ verticalAlign: 'sub' }} />
          <Countdown
            date={Date.now() + 10000}
            autoStart={true}
            renderer={({ formatted: { minutes, seconds } }) => <span className='pl-2'>{`${minutes}:${seconds}`}</span>}
          />
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={currentZone} onChange={changeCurrentZone} aria-label='Chọn level'>
          <Tab label='Level 1' />
          <Tab label='Level 3' />
          <Tab label='Level 5' />
        </Tabs>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'info', marginTop: 2 }}>
        <Tabs variant='fullWidth' value={currentGame} onChange={changeCurrentGame} aria-label='Chọn bài'>
          <Tab label='Số 1 - 5' {...a11yProps(0)} />
          <Tab label='Tổng hòa' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={currentGame} index={0}>
        <Grid
          container
          sx={{
            marginTop: 2,
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: '#FC33A3',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#140D50',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: '#211B61',
              padding: 2,
            },
          }}
        >
          {tonghoa.map((e) => {
            return (
              <Grid item key={e.stt} xs={3}>
                <div className='flex-col flex text-center p-3'>
                  <label className='text-white text-xl' htmlFor='h1'>
                    {e.value}
                  </label>
                  <label className='text-yellow-300' htmlFor='h1'>
                    {e.stt}
                  </label>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={currentGame} index={1}>
        <Grid
          container
          sx={{
            marginTop: 2,
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: '#FC33A3',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#140D50',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: '#211B61',
              padding: 2,
            },
          }}
        >
          {tonghoa.map((e) => {
            return (
              <Grid item key={e.stt} xs={3}>
                <div
                  className='flex-col flex text-center p-3'
                  onClick={() => {
                    console.log(e);
                  }}
                >
                  <label className='text-white text-xl' htmlFor='h1'>
                    {e.stt}
                  </label>
                  <label className='text-yellow-300' htmlFor='h1'>
                    {e.value}
                  </label>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
    </div>
  );
};

export default Home;
