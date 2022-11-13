import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Ball, Spinner } from '../../components';
import { sessionService } from '../../services';

const Trend = () => {
  const [value, setValue] = useState(1);
  const [dataSearch, setDataSearch] = useState({ limit: 20, zone: 'LEVEL_3' });

  const { data, isFetching } = useQuery(
    ['sessionService.getSessions', dataSearch],
    () => sessionService.getSessions(dataSearch),
    { keepPreviousData: true },
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setDataSearch({ ...dataSearch, zone: newValue === 0 ? 'LEVEL_1' : newValue === 1 ? 'LEVEL_3' : 'LEVEL_5' });
    setValue(newValue);
  };
  return (
    <div className='min-h-full'>
      <Spinner loading={isFetching}>
        <Box className='flex p-3 justify-center'>
          {/* <img className='' src={require('../../assets/images/icon.png')} alt='logo' loading='lazy' /> */}
          <label className='text-xl font-normal'>Xu hướng kỷ lục</label>
        </Box>
        <Box
          className='p-3 '
          sx={{
            background: '#ffffffd1',
            color: '#AFA8EC',
            minHeight: '100vh',
            marginBottom: '90px',
            borderRadius: '25px 25px 0px 0px',
          }}
        >
          <Box sx={{ width: '100%', marginTop: '39px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label='trend'>
                <Tab label='Level 1' />
                <Tab label='Level 3' />
                <Tab label='Level 5' />
              </Tabs>
            </Box>
          </Box>
          <Box>
            <Grid
              container
              sx={{
                marginTop: 2,
                '--Grid-borderWidth': '1px',
                borderTop: 'var(--Grid-borderWidth) solid',
                borderLeft: 'var(--Grid-borderWidth) solid',
                border: 'var(--Grid-borderWidth) solid',
                borderColor: '#AFA8EC',
                borderRadius: '10px',
                overflow: 'hidden',
                // background: '#140D50',
                '& > div': {
                  borderRight: 'var(--Grid-borderWidth) solid',
                  borderBottom: 'var(--Grid-borderWidth) solid',
                  borderColor: '#AFA8EC',
                  padding: 1,
                },
              }}
            >
              <Grid
                xs={2}
                className='font-nomal text-lg text-center'
                style={{
                  color: 'white',
                  background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
                }}
              >
                Số kỳ
              </Grid>

              <Grid
                xs={10}
                className='font-nomal text-lg text-center'
                style={{
                  color: 'white',
                  background: 'linear-gradient(180deg, #9689ED 0%, #5B4DBE 100%)',
                }}
              >
                Kết quả
              </Grid>
              {data?.results.map((e: { result: string; incId: string }) => {
                return (
                  <React.Fragment key={e.incId}>
                    <Grid xs={2} className='text-lg text-center'>
                      {e.incId}
                    </Grid>
                    {e.result.split('').map((value, index) => (
                      <Grid xs={2} key={index} display='flex justify-center'>
                        <Ball value={value}></Ball>
                      </Grid>
                    ))}
                  </React.Fragment>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Spinner>
    </div>
  );
};

export default Trend;
