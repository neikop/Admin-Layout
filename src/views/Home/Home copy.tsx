import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Avatar, Box, Button, Dialog, Grid, Tab, Tabs } from '@mui/material';
import { a11yProps, TabPanel } from 'components';
import { useTabs } from 'hooks';
import { useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { systemSelector } from 'reducers/systemSlice';
import { PopupBet } from 'views/Cards';
import { oneToFiveOdds, tongHoaOdds } from './constants';

const TABS = [
  { code: 'LEVEL_1', label: 'Level 1' },
  { code: 'LEVEL_3', label: 'Level 3' },
  { code: 'LEVEL_5', label: 'Level 5' },
];

const GAMES = [
  { code: 'ONE_TO_FIVE', label: 'Số 1 ~ 5' },
  { code: 'TONG_HOA', label: 'Tổng hoà' },
];

const Home = () => {
  const { currentSessions, lastSessions } = useSelector(systemSelector);
  const [currentZone, setCurrentZone] = useState(0);
  const [prefix, setPrefix] = useState('CHUC_NGAN');
  const [openBetPopup, setOpenBetPopup] = useState(false);
  const [onSelected, setOnSelected] = useState({});

  const [activeTab, onTabChange] = useTabs(TABS);
  const [activeGame, setActiveGame] = useState(GAMES[0].code);

  const [currentSession, lastSession] = useMemo(
    () => [currentSessions[activeTab], lastSessions[activeTab]],
    [currentSessions, lastSessions, activeTab],
  );

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

  return (
    <div className='h-full flex flex-col'>
      <div className='min-h-[60px] flex justify-between items-center px-3'>
        <img src={require('assets/icons/Binglo-icon.png')} className='w-[32px]' />
        <div>
          Kết quả kỳ
          <span className='bg-primary-gradient font-bold px-2 py-0.5 mx-1 rounded-full'>{lastSession.incId}</span>
          hôm nay
        </div>
        <InfoOutlinedIcon color='primary' />
      </div>

      <div className='flex justify-center gap-3 my-3'>
        {lastSession.result.split('').map((number, index) => (
          <Avatar key={index} className='bg-secondary-gradient font-bold'>
            {number}
          </Avatar>
        ))}
      </div>

      <div className='flex justify-between px-3 mb-3'>
        <div>
          Kỳ tiếp theo: <span className='font-medium'>{currentSession.incId}</span>
        </div>
        <div className='flex items-center gap-1'>
          <AccessTimeOutlinedIcon color='action' />
          <Countdown
            overtime
            date={currentSession.endTime}
            renderer={({ formatted: { minutes, seconds } }) => (
              <span className='font-medium'>
                {minutes}:{seconds}
              </span>
            )}
          />
        </div>
      </div>

      <div className='flex-1 bg-white/80 rounded-t-[24px] p-[12px]'>
        <Tabs
          value={activeTab}
          onChange={onTabChange}
          textColor='inherit'
          variant='fullWidth'
          classes={{
            flexContainer: 'flex border-b border-divider',
            indicator: 'h-[3px] rounded-full',
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.code} label={tab.label} value={tab.code} />
          ))}
        </Tabs>

        <div className='flex justify-center gap-2 my-3'>
          {GAMES.map((item, index) => (
            <Button
              key={index}
              variant={activeGame === item.code ? 'contained' : 'text'}
              color={activeGame === item.code ? 'primary' : 'inherit'}
              size='small'
              className='w-[90px]'
              onClick={() => setActiveGame(item.code)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <Box
        sx={{
          background: '#ffffffd1',
          color: '#AFA8EC',
          minHeight: '82vh',
          borderRadius: '25px 25px 0px 0px',
        }}
      >
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs centered value={currentZone} onChange={changeCurrentZone} aria-label='Chọn level'>
            <Tab label='Level 1' />
            <Tab label='Level 3' />
            <Tab label='Level 5' />
          </Tabs>
        </Box> */}
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
