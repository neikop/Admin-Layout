import { CardMedia, Dialog, Grid, Paper } from '@mui/material';

const CardAirdropItem = ({ item, event }: { item: any; event: any }) => {
  // const { isLoggedIn, address } = useSelector(profileSelector);
  // const { metaverseContractAddress } = useSelector(systemSelector);
  // const { validNetwork } = useValidNetwork();

  // const [isOpenClaim, setOpenClaim] = useState(false);

  // const { data: isInWhitelist } = useQuery(
  //   ['whitelistContract.isInWhitelist', { contract: item.whitelistContract, address }],
  //   () => whitelistContract(item.whitelistContract).methods.isInWhitelist(address).call(),
  //   { enabled: isLoggedIn },
  // );

  // const { data: alreadyClaimed } = useQuery(
  //   ['metaverseContract.metaverseEventClaims', { onchainId: item.onchainId, address }],
  //   () => metaverseContract(metaverseContractAddress).methods.metaverseEventClaims(item.onchainId, address).call(),
  //   { enabled: isLoggedIn },
  // );

  return (
    <></>
    // <Paper className='md:p-10 p-4 rounded-[24px] shadow-md' data-aos='fade-up'>
    //   <Grid container spacing={5}>
    //     <Grid item md={5.5} xs={12}>
    //       {item.itemVideo ? (
    //         <CardMedia
    //           component='video'
    //           image={item.itemVideo}
    //           className='max-w-[380px] rounded-[20px] mx-auto'
    //           playsInline
    //           autoPlay
    //           loop
    //           muted
    //           controls
    //           controlsList='nodownload'
    //         />
    //       ) : (
    //         <CardMedia image={item.itemImage} className='h-full min-h-[240px] bg-contain' />
    //       )}
    //     </Grid>
    //     <Grid item md={6.5} xs={12} className='flex flex-col items-start gap-3'>
    //       <div className='bg-info-light text-white font-nomal rounded-[8px] px-3 py-1'>{event.name}</div>
    //       <div className='font-nomal text-2xl text-info-dark'>{item.name}</div>

    //       <div className='font-semibold text-sm whitespace-pre-line'>{item.description}</div>
    //       <div className='font-bold text-orange-700'>{item.condition}</div>
    //       <div className='flex-1 flex md:flex-row flex-col items-end md:gap-6 gap-3'>
    //         {isLoggedIn ? (
    //           <DesignButton
    //             className='w-40'
    //             variant='contained'
    //             disabled={!isInWhitelist || alreadyClaimed}
    //             onClick={() => validNetwork(() => setOpenClaim(true))}
    //           >
    //             {alreadyClaimed ? 'CLAIMED' : 'CLAIM'}
    //           </DesignButton>
    //         ) : (
    //           <DesignButton className='w-40' onClick={() => validNetwork(walletService.connectWallet)}>
    //             Connect Wallet
    //           </DesignButton>
    //         )}
    //       </div>
    //       <Dialog open={isOpenClaim} fullWidth maxWidth='sm'>
    //         <PopupAirdrop item={item} onClose={() => setOpenClaim(false)} />
    //       </Dialog>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

export default CardAirdropItem;
