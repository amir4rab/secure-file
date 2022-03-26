import React from 'react';
import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    width: '100%',
    minHeight: '85vh',
    position: 'relative',
    overflow: 'hidden'
  },
  code: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    position: 'absolute',
    left: '50%',
    fontWeight: 'bold',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20vw',
    opacity: .05,
    zIndex: 1,
    userSelect: 'none',
    [theme.fn.smallerThan('sm')]: {
      fontSize: '20vh',
      transform: 'translate(-50%, -50%) rotate(90deg)',
    },
  },
  content: {
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10
  }
}))

interface Props {
  code: string,
  children: JSX.Element[] | JSX.Element
}

function ErrorWrapper({ code, children }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.inner}>
      <Text className={classes.code}>
        { code }
      </Text>
      <div className={classes.content}>
        { children }
      </div>
    </div>
  )
}

export default ErrorWrapper