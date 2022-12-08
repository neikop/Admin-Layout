import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { dashboardService } from 'services';
import { CommonSearch } from './components';
import { PopupCreateBank } from './popups';

const PaymentTokenList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const { data, isFetching } = useQuery(
    ['dashboardService.fetchBanks', dataSearch],
    () => dashboardService.fetchBanks(dataSearch),
    { keepPreviousData: true },
  );
  const { items = [], total, currentPage, pages: totalPage } = data ?? {};

  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between'>
        <CommonSearch onChange={onSearchChange} />
        <Button variant='contained' className='w-40' startIcon={<Add />} onClick={() => setOpenCreatePopup(true)}>
          Create
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Spinner loading={isFetching}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Number Bank</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Last Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.customerId}</TableCell>
                  <TableCell>{item.numberBank}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>{DateTime.fromISO(item.updatedAt).toFormat('dd/MM/yyyy HH:mm')}</TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isFetching && items.length === 0} />
            </TableBody>
            <caption className='font-bold border-t'>{total ?? 0} Banks</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination
          page={currentPage ?? 1}
          count={totalPage}
          onChange={(event, value) => onSearchChange({ page: value })}
        />
      </div>

      <Dialog open={openCreatePopup} fullWidth maxWidth='xs'>
        <PopupCreateBank onClose={() => setOpenCreatePopup(false)} />
      </Dialog>
    </>
  );
};

export default PaymentTokenList;
