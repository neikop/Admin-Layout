import { Tab, Tabs } from '@mui/material';
import { useTabs } from 'hooks';
import { TabDeposit, TabStats, TabWithdraw } from './components';

const Transaction = () => {
  const tabs = [
    { code: 'withdraw', label: 'LS Rút', component: <TabWithdraw /> },
    { code: 'deposit', label: 'LS Nạp', component: <TabDeposit /> },
    { code: 'stats', label: 'LS Tham gia', component: <TabStats /> },
  ];
  const [activeTab, onTabChange] = useTabs(tabs);

  return (
    <div>
      <div className='h-[60px] flex justify-center items-center'>
        <span className='font-bold text-xl'>Giao dịch</span>
      </div>
      <div className='bg-white/80 rounded-t-[24px] p-[12px]'>
        <Tabs
          value={activeTab}
          onChange={onTabChange}
          textColor='inherit'
          variant='fullWidth'
          classes={{
            flexContainer: 'flex border-b border-divider',
            indicator: 'h-[3px] rounded-full',
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.code} label={tab.label} value={tab.code} />
          ))}
        </Tabs>

        {tabs.map((tab) => (
          <div key={tab.code} hidden={tab.code !== activeTab} className='mt-[12px]'>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Transaction;
