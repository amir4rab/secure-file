import React, { useEffect, useRef, useState } from 'react';
import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  progressMeter: {
    position: 'fixed',
    left: '0%',
    top: '0%',
    width: '100%',
    height: '.25rem',
    zIndex: 10000
  },
  inner: {
    background: theme.colors.blue[7],
    height: '100%',
    width: '100%',
  },
  start: {
    transform: 'translateX(-75%)',
    transition: 'transform .9s ease-in-out'
  },
  done: {
    transform: 'translateX(0%)',
    transition: 'transform .3s ease-in-out'
  },
  startPos: {
    transform: 'translateX(-100%)',
    transition: 'transform 0s ease-in-out'
  },
}));
type AnimationStates = 'start' | 'done' | 'startPos';

function ProgressMeter() {
  const router = useRouter();
  const initialRender = useRef(true);
  const timeoutRef = useRef< NodeJS.Timeout | null >(null)
  const [ currentState, setCurrentState ] = useState< AnimationStates >('startPos');
  const { classes, cx } = useStyles();

  const setAnimation = ( animationState: AnimationStates ) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setCurrentState(animationState);

    if ( animationState === 'done' ) {
      timeoutRef.current = setTimeout(() => {
        setCurrentState('startPos');
      }, 350 );
    }
  }

  useEffect(() => {
    if ( !initialRender.current ) return;
    router.events.on('routeChangeStart', () =>  setAnimation('start'));
    router.events.on('routeChangeComplete', () =>  setAnimation('done'));
    router.events.on('routeChangeError', () =>  setAnimation('done'));
    initialRender.current = false;

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [ router ]);

  return (
    <div className={ classes.progressMeter }>
      <div className={cx([ classes.inner, classes[currentState] ])}/>
    </div>
  )
}

export default ProgressMeter