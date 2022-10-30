

const CardAirdropEvent = ({ item }: { item: any }) => {
  return (
    <></>
    // <Paper className='md:p-10 p-4 rounded-[24px] shadow-md' data-aos='fade-up'>
    //   <Grid container spacing={5}>
    //     <Grid item md={5.5} xs={12}>
    //       <CardMedia image={item.itemImage} className='h-full min-h-[240px] bg-contain' />
    //     </Grid>
    //     <Grid item md={6.5} xs={12} className='flex flex-col items-start gap-3'>
    //       <div className='bg-info-light text-white font-nomal rounded-[8px] px-3 py-1'>{item.name}</div>
    //       {item.isFinished ? (
    //         <div className='font-nomal text-2xl text-action-main'>AIRDROP EVENT HAS ENDED</div>
    //       ) : (
    //         <div className='font-nomal text-2xl text-info-dark'>AIRDROP EVENT</div>
    //       )}
    //       <CountdownTimer endTime={item.isStarted ? item.toDate : item.fromDate} />

    //       <div className='font-semibold text-sm whitespace-pre-line'>{item.description}</div>
    //       <div className='font-bold text-orange-700'>{item.condition}</div>
    //       <div className='flex-1 flex md:flex-row flex-col items-end md:gap-6 gap-3'>
    //         <a href={item.joinLink} rel='noreferrer' target='_blank'>
    //           <DesignButton color='secondary' className='w-40'>
    //             HOW TO JOIN
    //           </DesignButton>
    //         </a>
    //         {item.isStarted && !item.isFinished && (
    //           <Link to={publicRoute.metaverseEvent.url(item)}>
    //             <DesignButton className='w-40'>RECEIVE NOW</DesignButton>
    //           </Link>
    //         )}
    //       </div>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

export default CardAirdropEvent;
