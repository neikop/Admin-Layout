import { CardMedia, Grid, Paper } from '@mui/material';
import { ChipItemRarity } from './CardItem';

const CardSaleItem = ({ item }: { item: any }) => {
  return (
    <Paper elevation={0} className='p-5 rounded-[8px] hover:shadow-card'>
      <div className='font-nomal text-2xl max-line-1'>{item.name}</div>
      <div className='font-semibold text-sm'>#{item.tokenId}</div>
      <div className='relative mt-3'>
        {item.external.iconType === 'mp4' ? (
          <CardMedia
            component='video'
            image={item.external.iconUrl}
            className='max-w-[240px] rounded-[8px] mx-auto'
            autoPlay
            loop
            muted
          />
        ) : (
          <CardMedia image={item.external.iconUrl} className='h-[240px] rounded-[8px]' />
        )}
        <div className='absolute top-3 left-3'>
          <ChipItemRarity rarity={item.external.rarity} />
        </div>
      </div>
      <Grid container spacing={1} className='flex-col mt-3'>
        <Grid item className='flex items-center justify-between'>
          <div className='font-semibold text-sm'>Price:</div>
          <div className='font-bold'>
            {item.price.toLocaleString()} {item.paymentToken?.symbol}
          </div>
        </Grid>
        <Grid item className='flex items-center justify-between'>
          <div className='font-semibold text-sm'>Owner:</div>
          <div className='font-bold'>{(item.ownerAddress)}</div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardSaleItem;
