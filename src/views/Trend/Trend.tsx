import { Avatar, Grid, Tab, Tabs } from '@mui/material';
import { Spinner } from 'components';
import { useTabs } from 'hooks';
import { Fragment } from 'react';
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
    <div>
      <div className='h-[60px] flex justify-center items-center'>
        <span className='font-bold text-xl'>Xu hướng kỷ lục</span>
      </div>
      <div className='bg-white/80 rounded-t-[24px] p-[12px]'>
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
          {tabs.map((tab) => (
            <Tab key={tab.code} label={tab.label} value={tab.code} />
          ))}
        </Tabs>

        <Grid container className='mt-[12px] text-center'>
          <Grid item xs={3} className='bg-primary-gradient font-bold rounded-tl-[8px] py-3'>
            Số kỳ
          </Grid>
          <Grid item xs={9} className='border border-l-[0px] font-medium rounded-tr-[8px] py-3'>
            Kết quả
          </Grid>
          <Spinner loading={isFetching}>
            <Grid container className='text-center'>
              {data?.results.map((item) => (
                <Fragment key={item.id}>
                  <Grid item xs={3} className='font-medium border border-t-[0px] flex justify-center items-center'>
                    {item.incId}
                  </Grid>
                  {item.result.split('').map((number, index) => (
                    <Grid item xs={9 / 5} key={index} className='border border-t-[0px] border-l-[0px] p-[6px]'>
                      <Avatar className='bg-secondary-gradient font-medium w-[36px] h-[36px] mx-auto'>{number}</Avatar>
                    </Grid>
                  ))}
                </Fragment>
              ))}
            </Grid>
          </Spinner>
        </Grid>
      </div>
    </div>
  );
};

export default Trend;
