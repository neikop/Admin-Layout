import { Avatar, Grid, Tab, Tabs } from '@mui/material';
import { PerfectScrollbar, Spinner } from 'components';
import { useTabs } from 'hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { sessionService } from 'services';

const Trend = () => {
  const tabs = [
    { code: 'LEVEL_1', label: 'Level 1' },
    { code: 'LEVEL_3', label: 'Level 3' },
    { code: 'LEVEL_5', label: 'Level 5' },
  ];
  const [activeTab, onTabChange] = useTabs(tabs);

  const { data, isFetching } = useQuery(
    ['sessionService.getSessions', activeTab],
    () => sessionService.getSessions({ limit: 20, zone: activeTab }),
    { keepPreviousData: true },
  );

  return (
    <Spinner className='h-full flex flex-col' loading={isFetching}>
      <div className='h-[60px] flex justify-center items-center'>
        <span className='font-bold text-xl'>Xu hướng kỷ lục</span>
      </div>
      <div className='flex-1 bg-white/80 rounded-t-[24px] p-[12px]'>
        <Tabs
          value={activeTab}
          onChange={onTabChange}
          textColor='inherit'
          variant='fullWidth'
          classes={{
            flexContainer: 'flex border-b border-divider',
            indicator: 'h-[5px] rounded-full',
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.code} label={tab.label} value={tab.code} />
          ))}
        </Tabs>

        <Grid container className='mt-[12px]'>
          <Grid
            item
            xs={3}
            className='bg-primary-gradient font-bold rounded-tl-[8px] flex justify-center items-center py-3'
          >
            Số kỳ
          </Grid>
          <Grid
            item
            xs={9}
            className='border border-l-[0px] font-medium rounded-tr-[8px] flex justify-center items-center py-3'
          >
            Kết quả
          </Grid>

          <PerfectScrollbar style={{ maxHeight: `calc(100vh - 300px)` }}>
            <Grid
              container
              sx={{
                '> .MuiGrid-root': {
                  padding: '6px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            >
              {data?.results.map((item) => (
                <React.Fragment key={item.id}>
                  <Grid xs={3} className='font-medium border border-t-[0px]'>
                    {item.incId}
                  </Grid>
                  {item.result.split('').map((value, index) => (
                    <Grid xs={9 / 5} key={index} className='border border-t-[0px] border-l-[0px]'>
                      <Avatar className='bg-secondary-gradient font-medium w-[36px] h-[36px]'>{value}</Avatar>
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
          </PerfectScrollbar>
        </Grid>
      </div>
    </Spinner>
  );
};

export default Trend;
