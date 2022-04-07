import React from 'react'
import { Box, Skeleton, createStyles } from '@mantine/core';

interface Props {
  skeletonNum?: number
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: '1rem',
    maxHeight: '80vh',
    overflow: 'hidden',
    position: 'relative',
    [':after']: {
      content: "''",
      minWidth: '100%',
      minHeight: '10vh',
      left: '0',
      bottom: '0',
      background: `linear-gradient(0deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[7]}00 100%)`,
      position: 'absolute',
      zIndex: 15
      
    }
  }
}))

const skeletonChildren = ( skeletonNum: number ) => {
  const output: JSX.Element[] = [];
  for ( let i = 0; i < skeletonNum; i++ ) {
    output.push(<Skeleton key={ i } height={'4rem'} mb='md' radius='md' />)
  }
  return output;
}

function LoadingSkeleton( { skeletonNum= 12 }: Props ) {
  const { classes } = useStyles();

  return (
    <Box className={ classes.wrapper }>
      { skeletonChildren(skeletonNum) }
    </Box>
  )
}

export default LoadingSkeleton