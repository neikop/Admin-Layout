import { CardMedia, DialogContent, DialogTitle, Grid } from '@mui/material';

// type any = PopupController & {
//   item: AirdropItem;
// };

const PopupAirdrop = ({ item, onClose }: any) => {
  // const { enqueueSnackbar } = useSnackbar();
  // const { address } = useSelector(profileSelector);

  // const {
  //   mutate: claim,
  //   isLoading,
  //   isSuccess,
  // } = useMutation(
  //   async () => {
  //     const maxFeeForFast = (await getPolygonFee(+appChainId)) as number;

  //     return metaverseContract(metaverseContractAddress)
  //       .methods.claim721Event(item.onchainId, randomTokenID())
  //       .send({
  //         from: address,
  //         gasPrice: Math.ceil(maxFeeForFast),
  //       });
  //   },
  //   {
  //     onSuccess: () => {
  //       enqueueSnackbar('Claim airdrop successfully');
  //       queryClient.invalidateQueries('metaverseContract.metaverseEventClaims');
  //       queryClient.invalidateQueries('marketService.fetchItems');
  //     },
  //   },
  // );

  return (
    <>
      {/* <DialogTitle>Airdrop</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={5.5}>
            <div className='flex justify-center items-center h-[180px]'>
              {item.itemVideo ? (
                <CardMedia
                  component='video'
                  image={item.itemVideo}
                  className='max-w-[180px] rounded-[8px]'
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <CardMedia image={item.itemImage} className='h-full flex-1 bg-contain' />
              )}
            </div>
          </Grid>
          <Grid item xs={6} className='flex flex-col gap-6'>
            <div>
              <div className='text-neutral-400'>You are about to claim airdrop</div>
              <div className='font-bold'>{item.name}</div>
            </div>

            <div className='flex-1 flex items-end'>
              {isSuccess ? (
                <Link to={{ pathname: publicRoute.inventory.path, search: 'tab=owned' }}>
                  <DesignButton color='secondary' className='w-40'>
                    To Inventory
                  </DesignButton>
                </Link>
              ) : (
                <DesignButton className='w-40' loading={isLoading} onClick={() => claim()}>
                  {isLoading ? 'Processing' : 'CLAIM'}
                </DesignButton>
              )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <CloseButton onClick={onClose} disabled={isLoading} /> */}
    </>
  );
};

export default PopupAirdrop;
