import { CardMedia, Paper } from '@mui/material';

export const ChipItemRarity = ({ rarity }: { rarity: any }) => (
  <div
    // className={merge('px-2 py-1 rounded-[8px]', {
    //   'bg-rarity-common': rarity === 'Common',
    //   'bg-rarity-rare': rarity === 'Rare',
    //   'bg-rarity-epic': rarity === 'Epic',
    //   'bg-rarity-legendary': rarity === 'Legendary',
    //   'bg-gradient-to-r from-[#885CFF] to-[#F33935]': rarity === 'Unique',
    // })}
  >
    <span className='font-semibold text-sm uppercase text-white'>{rarity}</span>
  </div>
);

const CardItem = ({ item }: { item: any }) => {
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
    </Paper>
  );
};

CardItem.Rarity = ChipItemRarity;

export default CardItem;
