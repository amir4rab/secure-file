import React, { useState } from 'react';

// mantine components
import { createStyles, Tabs, Text } from '@mantine/core'

// icons
import { IoPaperPlane, IoArchive, IoStatsChart, IoPower } from 'react-icons/io5';

// components
import ConnectSummery from '@/components/connect-page/connectSummery';
import ConnectSend from '@/components/connect-page/connectSend';
import ConnectReceive from '@/components/connect-page/connectReceive';
import ConnectExit from '@/components/connect-page/connectExit';

// types
import { SendArray, ReceiveArray } from '@/types/connect';
import ConnectPercentDisplayer from '../connectPercentDisplayer';
import useMediaQuery from '@/hooks/useMediaQuery';

// translation
import useTranslation from '@/translation/useTranslation';;

// styles
const useStyles = createStyles((theme) => ({
  tabTitle: {
    fontWeight: 400,
    fontSize: theme.fontSizes.sm,
  },
  icon: {
    fontWeight: 400,
  },
  tabActive: {
    color: theme.colors.blue[5]
  },
}));


interface Props {
  receiveArray: ReceiveArray;
  sendArray: SendArray;
  currentPercent: number;
  isTransferring: boolean
};
const ConnectConnected = ( { sendArray, receiveArray, currentPercent, isTransferring }: Props ) => {
  const [ activeTab, setActiveTab ] = useState(0);
  const { classes } = useStyles();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { t } = useTranslation('connect-data')

  return (
    <div>
      <ConnectPercentDisplayer currentPercent={ currentPercent } isTransferring={ isTransferring } />
      <Tabs 
        onTabChange={ setActiveTab } 
        active={ activeTab } 
        tabPadding='xl' 
        variant='pills'
      >
        <Tabs.Tab 
          icon={ 
            <IoStatsChart className={ classes.icon }/> 
          } 
          label={ 
            isDesktop && <Text className={ classes.tabTitle }>{ t('summery') }</Text>
          }
        >
          <ConnectSummery 
            sendArray={ sendArray } 
            receiveArray={ receiveArray } 
          />
        </Tabs.Tab>
        <Tabs.Tab 
          icon={ 
            <IoPaperPlane className={ classes.icon }/> 
          } 
          label={ 
            isDesktop && <Text className={ classes.tabTitle }>{ t('send') }</Text>
          }
        >
          <ConnectSend filesArray={ sendArray } />
        </Tabs.Tab>
        <Tabs.Tab 
          icon={ 
            <IoArchive className={ classes.icon }/>
          } 
          label={ 
            isDesktop && <Text className={ classes.tabTitle }>{ t('receive') }</Text>
          }
        >
          <ConnectReceive filesArray={ receiveArray }/>
        </Tabs.Tab>
        <Tabs.Tab 
          icon={ 
            <IoPower className={ classes.icon } style={{ color: 'red' }} />
          }
          label={ 
            isDesktop && <Text className={ classes.tabTitle }>{ t('exit') }</Text>
          }
        >
          <ConnectExit />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default ConnectConnected