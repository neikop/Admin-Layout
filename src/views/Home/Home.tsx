import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Box, Dialog, Grid, IconButton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { a11yProps, Ball, TabPanel } from '../../components';
import { oneToFiveOdds, tongHoaOdds } from '../../contants/odds';
import { systemSelector } from '../../reducers/systemSlice';
import { PopupBet } from '../Cards';

const Home = () => {
  const { currentSessions, lastSessions } = useSelector(systemSelector);
  const [session, setSession] = useState({ id: '', result: '', nextPeriod: '0', endTime: 100000 });
  const [currentZone, setCurrentZone] = useState(0);
  const [prefix, setPrefix] = useState('CHUC_NGAN');
  const [openBetPopup, setOpenBetPopup] = useState(false);
  const [onSelected, setOnSelected] = useState({});
  const changeCurrentZone = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentZone(newValue);
    let lastSession, currentSession;
    switch (newValue) {
      case 0:
        lastSession = lastSessions.LEVEL_1;
        currentSession = currentSessions.LEVEL_1;
        setSession({
          id: lastSession.incId,
          result: lastSession.result,
          nextPeriod: currentSession.incId,
          endTime: currentSession.countdown * 1000,
        });
        break;

      case 1:
        lastSession = lastSessions.LEVEL_3;
        currentSession = currentSessions.LEVEL_3;
        setSession({
          id: lastSession.incId,
          result: lastSession.result,
          nextPeriod: currentSession.incId,
          endTime: currentSession.countdown * 1000,
        });
        break;

      case 2:
        lastSession = lastSessions.LEVEL_5;
        currentSession = currentSessions.LEVEL_5;
        setSession({
          id: lastSession.incId,
          result: lastSession.result,
          nextPeriod: currentSession.incId,
          endTime: currentSession.countdown * 1000,
        });
        break;

      default:
        break;
    }
  };
  const [currentGame, setCurrentGame] = useState(0);
  const changeCurrentGame = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentGame(newValue);
  };
  const [currentGame1to5, setCurrentGame1to5] = useState(0);
  const changeCurrentGame1to5 = (event: React.SyntheticEvent, newValue: number) => {
    let prefix;
    switch (newValue) {
      case 0:
        prefix = 'CHUC_NGAN';
        break;
      case 1:
        prefix = 'NGAN';
        break;
      case 2:
        prefix = 'TRAM';
        break;
      case 3:
        prefix = 'CHUC';
        break;
      case 4:
        prefix = 'DON_VI';
        break;

      default:
        prefix = 'CHUC_NGAN';
        break;
    }
    setPrefix(prefix);
    setCurrentGame1to5(newValue);
  };

  useEffect(() => {
    if (currentSessions && lastSessions) {
      let lastSession, currentSession;
      lastSession = lastSessions?.LEVEL_1;
      currentSession = currentSessions.LEVEL_1;
      setSession({
        id: lastSession.incId,
        result: lastSession.result,
        nextPeriod: currentSession.incId,
        endTime: currentSession.countdown * 1000,
      });
    }
  }, [lastSessions, currentSessions]);

  return (
    <div className='pt-3 leading-8'>
      <Box className='flex px-3 justify-between'>
        <img className='' src={require('../../assets/images/icon.png')} alt='logo' loading='lazy' />
        <label className=' text-xl font-normal'>Kết quả kỳ {session.id} hôm nay</label>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      <Box className='flex mx-20 my-6 justify-center'>
        {session.result.split('').map((value, index) => (
          <Ball key={index} value={value}></Ball>
        ))}
      </Box>
      <Box className='flex px-3 py-1 justify-between'>
        <label className='' htmlFor='h1'>
          Kỳ tiếp theo: {session.nextPeriod}
        </label>
        <Box className='content-center justify-self-auto'>
          <AccessTimeOutlinedIcon style={{ verticalAlign: 'sub' }} />
          <Countdown
            date={Date.now() + session.endTime}
            autoStart={true}
            intervalDelay={0}
            renderer={({ formatted: { minutes, seconds } }) => <span className='pl-2'>{`${minutes}:${seconds}`}</span>}
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: '#ffffffd1',
          color: '#AFA8EC',
          minHeight: '82vh',
          borderRadius: '25px 25px 0px 0px',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs centered value={currentZone} onChange={changeCurrentZone} aria-label='Chọn level'>
            <Tab label='Level 1' />
            <Tab label='Level 3' />
            <Tab label='Level 5' />
          </Tabs>
        </Box>
        <Box sx={{ borderBottom: 1 }}>
          <Tabs variant='fullWidth' value={currentGame} onChange={changeCurrentGame} aria-label='Chọn bài'>
            <Tab label='Số 1 - 5' {...a11yProps(0)} />
            <Tab label='Tổng hòa' {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* 1den5 */}
        <TabPanel value={currentGame} index={0}>
          <Grid
            sx={{
              '--Grid-borderWidth': '1px',
              border: 'var(--Grid-borderWidth) solid',
              borderRadius: '10px 10px 0px 0px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
              borderColor: '#AFA8EC',
              padding: '10px',
              '& .MuiTab-root': {
                color: 'white',
                '&.Mui-selected': {
                  color: '#1E2843',
                },
              },
            }}
          >
            <Tabs variant='fullWidth' value={currentGame1to5} onChange={changeCurrentGame1to5} aria-label='Chọn bài'>
              <Tab label='C.Ngàn' />
              <Tab label='Ngàn' />
              <Tab label='Trăm' />
              <Tab label='Chục' />
              <Tab label='Đơn vị' />
            </Tabs>
          </Grid>
          <Grid
            container
            sx={{
              '--Grid-borderWidth': '1px',
              // borderTop: 'var(--Grid-borderWidth) solid',
              // borderLeft: 'var(--Grid-borderWidth) solid',
              border: 'var(--Grid-borderWidth) solid',
              borderColor: '#AFA8EC',
              borderRadius: '0px 0px 10px 10px',
              overflow: 'hidden',
              '& > div': {
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: '#AFA8EC',
                padding: 2,
              },
            }}
          >
            {oneToFiveOdds.map((e) => {
              return (
                <Grid key={e.id} xs={(e.colspan && e.colspan * 3) || 3}>
                  <div
                    className='flex-col flex text-center'
                    onClick={() => {
                      setOpenBetPopup(true);
                      setOnSelected({
                        game: currentGame === 0 ? 'ONE_TO_FIVE' : 'TONG_HOA',
                        zone: currentZone === 0 ? 'LEVEL_1' : currentZone === 1 ? 'LEVEL_3' : 'LEVEL_5',
                        gate: `${prefix}_${e.id}`,
                      });
                    }}
                  >
                    <label className='text-xl' style={{ color: '#564BA8' }} htmlFor='h1'>
                      {e.name}
                    </label>
                    <label className='' htmlFor='h1'>
                      {e.odds}
                    </label>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        {/* tong hoa */}
        <TabPanel value={currentGame} index={1}>
          <Grid
            sx={{
              border: 'var(--Grid-borderWidth) solid',
              borderColor: '#1E2843',
              borderRadius: '10px 10px 0px 0px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
              padding: '15px',
              color: 'white',
            }}
            xs={12}
          >
            Tổng 3 hàng cuối cùng
          </Grid>
          <Grid
            container
            sx={{
              '--Grid-borderWidth': '1px',
              borderTop: 'var(--Grid-borderWidth) solid',
              borderLeft: 'var(--Grid-borderWidth) solid',
              border: 'var(--Grid-borderWidth) solid',
              borderColor: '#AFA8EC',
              borderRadius: '0px 0px 10px 10px',
              overflow: 'hidden',
              // background: '#140D50',
              '& > div': {
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: '#AFA8EC',
                padding: 2,
              },
            }}
          >
            {tongHoaOdds.map((e) => {
              return (
                <Grid key={e.id} xs={3}>
                  <div
                    className='flex-col flex text-center'
                    onClick={() => {
                      setOpenBetPopup(true);
                      setOnSelected({
                        game: currentGame === 0 ? 'ONE_TO_FIVE' : 'TONG_HOA',
                        zone: currentZone === 0 ? 'LEVEL_1' : currentZone === 1 ? 'LEVEL_3' : 'LEVEL_5',
                        gate: e.id,
                      });
                    }}
                  >
                    <label className='text-xl' style={{ color: '#564BA8' }} htmlFor='h1'>
                      {e.name}
                    </label>
                    <label className='' htmlFor='h1'>
                      {e.odds}
                    </label>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      </Box>

      <Dialog
        open={openBetPopup}
        onClose={() => {
          setOpenBetPopup(false);
        }}
        className='text-center'
      >
        <PopupBet
          onClose={() => {
            setOpenBetPopup(false);
          }}
          item={onSelected}
        />
      </Dialog>
    </div>
  );
};

export default Home;
