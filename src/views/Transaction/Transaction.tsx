import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { a11yProps, Spinner, TabPanel } from '../../components';
import { sessionService, transactionService } from '../../services';
import moment from 'moment';
const Transaction = () => {
  const [value, setValue] = useState(1);
  const [dataSearch, setDataSearch] = useState(1);

  const { data, isFetching } = useQuery(
    [`transactionService.get${dataSearch}`, dataSearch],
    () => {
      switch (dataSearch) {
        case 0:
          return transactionService.getWithdraw();
        case 1:
          return transactionService.getDeposit();
        case 2:
          return sessionService.getGeneralStats();
        default:
          return transactionService.getDeposit();
      }
    },
    { keepPreviousData: true },
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setDataSearch(newValue);
    setValue(newValue);
  };
  return (
    <div className='min-h-full'>
      <Box className='flex p-3 justify-center'>
        {/* <img className='' src={require('../../assets/images/icon.png')} alt='logo' loading='lazy' /> */}
        <label className='text-xl font-normal'>Giao dịch</label>
      </Box>
      <Box
        sx={{
          background: '#ffffffd1',
          color: '#AFA8EC',
          minHeight: '90vh',
          marginBottom: '90px',
          borderRadius: '25px 25px 0px 0px',
          '& >div>div>.css-19kzrtu': { padding: 0 },
          '& >div>div>.css-19kzrtu >div': { background: 'transparent' },
        }}
      >
        <Box sx={{ width: '100%' }} className='p-3 '>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label='trend'>
              <Tab label='LS rút' {...a11yProps(0)} />
              <Tab label='LS nạp' {...a11yProps(1)} />
              <Tab label='LS tham gia' {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Box>
        <Spinner loading={isFetching}>
          <TabPanel value={value} index={1}>
            <TableContainer sx={{ padding: 0 }} component={Paper}>
              <Table sx={{ width: '100%' }} aria-label='ls nạp'>
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian</TableCell>
                    <TableCell align='right'>Số tiền</TableCell>
                    <TableCell align='right'>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.deposits &&
                    data?.deposits.map((row: any, index: any) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                          {moment(row.createdAt).format('HH:SS DD/MM/YYYY')}
                        </TableCell>
                        <TableCell sx={{ color: 'green' }} align='right'>
                          {row.amount}
                        </TableCell>
                        <TableCell align='right'>
                          {row.status === 'SUCCESS' ? (
                            <Typography sx={{ color: '#2996C5' }}>Đã nạp</Typography>
                          ) : (
                            <Typography sx={{ color: 'red' }}>Lỗi</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table sx={{ width: '100% ' }} aria-label='ls rút'>
                <TableHead>
                  <TableRow className='font-black'>
                    <TableCell className='font-black'>Thời gian</TableCell>
                    <TableCell align='right' className='font-black'>
                      Số tiền
                    </TableCell>
                    <TableCell align='right' className='font-black'>
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.withdrawals &&
                    data?.withdrawals.map((row: any, index: number) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                          {moment(row.createdAt).format('HH:SS DD/MM/YYYY')}
                        </TableCell>
                        <TableCell sx={{ color: 'green' }} align='right'>
                          {row.amount}
                        </TableCell>
                        <TableCell align='right'>
                          {row.status === 'APPROVED' ? (
                            <Typography sx={{ color: '#2996C5' }}>Đã rút</Typography>
                          ) : row.status === 'REJECTED' ? (
                            <Typography sx={{ color: '#2996C5' }}>Từ chối</Typography>
                          ) : (
                            <Typography sx={{ color: 'red' }}>Chờ</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TableContainer component={Paper}>
              <Table sx={{ width: '100% ' }} aria-label='ls tham gia'>
                <TableHead>
                  <TableRow>
                    <TableCell>Cấp</TableCell>
                    <TableCell align='right'>Tổng cược</TableCell>
                    <TableCell align='right'>Thưởng</TableCell>
                    <TableCell align='right'>Số kỳ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results &&
                    data?.results.map((row: any, index: number) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.session.zone}</TableCell>
                        <TableCell align='right'>{row.totalBet}</TableCell>
                        <TableCell align='right'>{row.totalWinnings}</TableCell>
                        <TableCell align='right'>{row.session.incId}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <Box
            className='flex justify-between border px-6 mt-auto'
            sx={{
              position: 'fixed',
              maxWidth: '600px',
              width: '100%',
              bottom: '130px',
              color: 'white',
              borderRadius: '24px',
              background: `${
                value === 0
                  ? 'linear-gradient(180deg, #EDA767 0%, #DF8532 100%)'
                  : value === 1
                  ? 'linear-gradient(180deg, #80D078 0%, #50B046 100%)'
                  : 'linear-gradient(180deg, #FF9E7E 0%, #FF5018 100%)'
              }`,
              boxShadow: `${
                value === 0
                  ? ' 0px 4px 4px rgba(236, 79, 29, 0.2)'
                  : value === 1
                  ? '0px 4px 4px rgba(80, 176, 70, 0.26)'
                  : '0px 4px 4px rgba(236, 79, 29, 0.3)'
              }`,
            }}
          >
            <Typography variant='subtitle1' component='h2'>
              {value === 2 ? 'Tổng lượt chơi: ' : 'Tổng số: '}
              {data?.totalDeposits || data?.totalWithdrawls || data?.totalResults || 0}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {value === 2 ? 'Tổng lợi nhuận: ' : 'Tổng: '}
              {data?.totalDepositAmount || data?.totalWithdrawAmount || data?.totalWinnings || 0}
            </Typography>
          </Box>
        </Spinner>

        <Box></Box>
      </Box>
    </div>
  );
};
export default Transaction;
