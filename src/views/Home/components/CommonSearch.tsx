import { Button, debounce, Grid, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CommonSearch = ({ onChange }: SearchController) => {
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));

  const [search, setSearch] = useState(params.search ?? '');
  const [queries, setQueries] = useState({ search });

  const handleClickReset = () => {
    setSearch('');
    setQueries({ search: '' });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChangeParams = useCallback(
    debounce((values) => {
      setQueries((params) => ({ ...params, ...values }));
    }, 300),
    [],
  );

  useEffect(() => {
    onChange({ ...queries });
  }, [onChange, queries]);

  return (
    <Grid container columnSpacing={3}>
      <Grid item sm={3} md={4}>
        <TextField
          fullWidth
          label='Search'
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            debounceChangeParams({ search: event.target.value });
          }}
        />
      </Grid>

      <Grid item sm={3}>
        <Button variant='outlined' color='inherit' onClick={handleClickReset}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default CommonSearch;
