import { AccessTimeOutlined, InfoOutlined } from '@mui/icons-material';
import { Avatar, Button, ButtonGroup, Dialog, Grid, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import { AppLogo } from 'components';
import { useTabs } from 'hooks';
import { useMemo, useState } from 'react';
import { default as Countdown } from 'react-countdown';
import { useSelector } from 'react-redux';
import { systemSelector } from 'reducers/systemSlice';
import { PopupBet, PopupInfo } from './components';
import { ONE_TO_FIVE, TONG_HOA } from './components/games';

const TABS = [
  { code: 'LEVEL_1', label: 'Level 1' },
  { code: 'LEVEL_3', label: 'Level 3' },
  { code: 'LEVEL_5', label: 'Level 5' },
];

const GAMES = [
  { code: 'ONE_TO_FIVE', label: 'Số 1 ~ 5' },
  { code: 'TONG_HOA', label: 'Tổng hoà' },
];

const GATES = [
  { code: 'CHUC_NGAN_', label: 'C.Ngàn' },
  { code: 'NGAN_', label: 'Ngàn' },
  { code: 'TRAM_', label: 'Trăm' },
  { code: 'CHUC_', label: 'Chục' },
  { code: 'DON_VI_', label: 'Đơn vị' },
];

const Home = () => {
  const { currentSessions, lastSessions } = useSelector(systemSelector);

  const [activeZone, onTabChange] = useTabs(TABS);
  const [activeGame, setActiveGame] = useState(GAMES[0].code);
  const [activeGate, setActiveGate] = useState(GATES[0].code);
  const [activeItem, setActiveItem] = useState('');

  const [currentSession, lastSession] = useMemo(
    () => [currentSessions[activeZone], lastSessions[activeZone]],
    [currentSessions, lastSessions, activeZone],
  );

  const [openInfo, setOpenInfo] = useState(false);
  const [openBet, setOpenBet] = useState(false);
  const isOneToFive = activeGame === 'ONE_TO_FIVE';

  return (
    <div>
      <div className='min-h-[60px] flex justify-between items-center px-3'>
        <AppLogo size={32} />
        <div>
          Kết quả kỳ
          <span className='bg-primary-gradient font-bold px-2 py-0.5 mx-1 rounded-full'>{lastSession.incId}</span>
          hôm nay
        </div>
        <Tooltip title='Quy định'>
          <IconButton size='small' onClick={() => setOpenInfo(true)}>
            <InfoOutlined color='primary' />
          </IconButton>
        </Tooltip>
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
          <AccessTimeOutlined color='action' />
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

      <div className='bg-white/80 rounded-t-[24px] p-[12px]'>
        <Tabs
          value={activeZone}
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

        {isOneToFive && (
          <>
            <div className='flex justify-center mb-2'>
              <ButtonGroup variant='text'>
                {GATES.map((item, index) => (
                  <Button
                    variant={activeGate === item.code ? 'contained' : 'outlined'}
                    style={{ borderLeftWidth: index ? 0 : 1 }}
                    key={index}
                    onClick={() => setActiveGate(item.code)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <Grid container className='border-t'>
              {ONE_TO_FIVE.map((item, index) => (
                <Grid
                  item
                  xs={3 * item.colspan}
                  key={index}
                  className='border border-t-[0px] text-center pt-1 pb-2 cursor-pointer hover:bg-black/5'
                  style={{ borderLeft: index % (item.cross > 2 ? 4 : 2) ? 'none' : '' }}
                  onClick={() => {
                    setOpenBet(true);
                    setActiveItem(activeGate + item.gate);
                  }}
                >
                  <div className='text-primary-dark text-[24px] font-medium'>{item.label}</div>
                  <div className='text-primary-light'>{item.cross}</div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {isOneToFive || (
          <Grid container>
            <Grid item xs={12} className='bg-primary-gradient font-bold text-center rounded-t-[8px] p-2'>
              Tổng 3 hàng cuối cùng
            </Grid>
            <Grid container>
              {TONG_HOA.map((item, index) => (
                <Grid
                  item
                  xs={3}
                  key={index}
                  className='border border-t-[0px] text-center pt-1 pb-2 cursor-pointer hover:bg-black/5'
                  style={{ borderLeft: index % 4 ? 'none' : '' }}
                  onClick={() => {
                    setOpenBet(true);
                    setActiveItem(item.gate);
                  }}
                >
                  <div className='text-primary-dark text-[24px] font-medium'>{item.gate}</div>
                  <div className='text-primary-light'>{item.cross}</div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </div>

      <Dialog open={openInfo} fullScreen>
        <PopupInfo onClose={() => setOpenInfo(false)} />
      </Dialog>
      <Dialog open={openBet} onClose={() => setOpenBet(false)}>
        <PopupBet
          onClose={() => setOpenBet(false)}
          item={{
            zone: activeZone,
            game: activeGame,
            gate: activeItem,
          }}
        />
      </Dialog>
    </div>
  );
};

export default Home;
