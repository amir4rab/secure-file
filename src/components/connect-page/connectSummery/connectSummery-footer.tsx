import React from 'react'

// mantine components //
import { Title, Box, createStyles, ScrollArea, Center, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';

// icons //
import { IoPaperPlane, IoArchive, IoArrowUp, IoArrowDown } from 'react-icons/io5';

// types //;
import { IconType } from 'react-icons';

// hooks //
import { useConnectContext } from '@/providers/connectContext';
import useTranslation from '@/translation/useTranslation';;
import ConnectSummeryHashDisplayer from './connectSummery-hashDisplayer';

// styles //
const useStyles = createStyles((theme) => ({
  infoBox: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.xl}px`,
    borderRadius: theme.radius.md,
    [ theme.fn.smallerThan('md') ] : {
      padding: theme.spacing.md
    }
  },
  infoBoxName: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.fontSizes.xs,
  },
  hash: {
    marginBottom: theme.spacing.md
  },
  hashText: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 600,
  },
  itemsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  stats: {
    fontSize: theme.fontSizes.xl
  },
  statsIcon: {
    transform: 'rotateZ(45deg)',
    color: theme.colors.blue[7]
  }
}));


interface StatsBoxProps {
  name: string,
  value: string,
  Icon: IconType,
}
const StatsBox = ( { name, Icon, value }: StatsBoxProps ) => {
  const { classes } = useStyles();

  return (
    <Box className={ classes.infoBox }>
      <Text className={ classes.infoBoxName }>
        { name }
      </Text>
      <Box className={ classes.itemsRow }>
        <Text className={ classes.stats }>
          { value }
        </Text>
        <ThemeIcon size='xl' color='gray'>
          <Icon className={[ classes.stats, classes.statsIcon ].join(' ')}/>
        </ThemeIcon>
      </Box>
    </Box>
  )
}

const ConnectSummeryFooter = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('connect-data');
  const { hash } = useConnectContext();

  return (
    <>
      <Box className={ classes.infoBox }>
        <Text className={ classes.infoBoxName }>
          { t('connectionHash') }
        </Text>
          {/* <Text classNames={ classes.hashText }>
            { hash }
          </Text> */}
        <ConnectSummeryHashDisplayer hash={ hash } />
        <Text align='center' size='xs'>
          { t('connectionHashInfo') }
        </Text>
      </Box>
      {/* <SimpleGrid
        my='xl'
        cols={2}
        spacing='sm'
        breakpoints={[
          { maxWidth: 'md', cols: 1 }
        ]}
      >
        <StatsBox
          Icon={ IoArrowUp }
          name={ 'Sended' }
          value={ '1G' }
        />
        <StatsBox
          Icon={ IoArrowDown }
          name={ 'Received' }
          value={ '1G' }
        />
      </SimpleGrid> */}
    </>
  )
}

export default ConnectSummeryFooter