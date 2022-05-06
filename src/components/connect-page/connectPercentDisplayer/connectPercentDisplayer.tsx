import React from 'react'
import { RingProgress, createStyles, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    // transitions
    transition: 'transform .3s ease-in-out, opacity .4s ease',

    // positioning
    position: 'fixed',
    right: '1rem',
    bottom: '12vh',

    // size
    width: '6rem',
    height: '6rem',
    overflow: 'hidden',

    // debug
    // border: '.1rem solid red',

    // center align
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    // background and box shadow
    backgroundColor: `${theme.colors.dark[7]}70`,
    borderRadius: '50%',
    boxShadow: `0 0 1rem ${theme.colors.dark[7]}`,
    backdropFilter: 'blur(1rem)',

    [theme.fn.largerThan('md')]: {
      right: 'calc(calc(100vw - 960px) / 2)'
    }
  },
  display: {
    transform: 'translate( 0, 0 )',
    opacity: 1
  },
  hide: {
    transform: 'translate( 10rem, 0 )',
    opacity: 0
  }
}))

interface Props {
  isTransferring: boolean;
  currentPercent: number;
};
const ConnectPercentDisplayer = ( { isTransferring, currentPercent }: Props ) => {
  const { classes } = useStyles();

  return (
    <div className={[ classes.wrapper, isTransferring ? classes.display : classes.hide ].join(' ')}>
      <RingProgress 
        sections={[{
          value:  isTransferring ? currentPercent : 100,
          color: 'blue'
        }]}
        size={ 100 }
        label={
          <Text color='blue' weight={700} align='center' size='md'>
            {  isTransferring ? currentPercent : 100 + `%` }
          </Text>
        }
      />
    </div>
  )
}

export default ConnectPercentDisplayer