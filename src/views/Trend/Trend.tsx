import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Ball } from '../../components';

const Trend = () => {
  const [value, setValue] = useState(1);
  const result = [
    { soky: 1123, ketqua: '12345' },
    { soky: 21231, ketqua: '34865' },
    { soky: 3123, ketqua: '17865' },
    { soky: 4123, ketqua: '76865' },
    { soky: 1235, ketqua: '98865' },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className='p-3'>
      <Box className='flex px-3 justify-center'>
        {/* <img className='' src={require('../../assets/images/icon.png')} alt='logo' loading='lazy' /> */}
        <label className='text-white text-xl font-normal'>Xu hướng kỷ lục</label>
      </Box>

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
          <Grid xs={2} className='font-nomal text-xl text-center' style={{ background: '#FC33A3' }}>
            Số kỳ
          </Grid>

          <Grid xs={10} className='font-nomal text-xl text-center' style={{ background: '#1E2843' }}>
            Kết quả
          </Grid>
          {result.map((e) => {
            return (
              <>
                <Grid xs={2} className='font-nomal text-xl text-center'>
                  {e.soky}
                </Grid>
                {e.ketqua.split('').map((value) => (
                  <Grid xs={2} display='flex justify-center'>
                    <Ball key={value} value={value}></Ball>
                  </Grid>
                ))}
              </>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Trend;
