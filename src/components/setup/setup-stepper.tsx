import React from 'react';
import { Stepper } from '@mantine/core';

import { IoBook, IoKey, IoCheckmarkDone, IoCheckmarkCircle } from 'react-icons/io5';

function SetupStepper({ active, setActive }:{ active: number, setActive: (a: number) => void }) {
  return (
    <Stepper py='xl' active={active} onStepClick={setActive} completedIcon={<IoCheckmarkCircle fontSize='1.5rem' />}
      sx={(theme) => ({
        [theme.fn.smallerThan('md')]: {
          overflowX: 'scroll',
          maxWidth: '100%',
        }
      })}
    >
      <Stepper.Step allowStepSelect={ false } icon={<IoBook fontSize='1.25rem'/>} label='TOS' />
      <Stepper.Step allowStepSelect={ false } icon={<IoKey fontSize='1.25rem'/>} label='Chose a password' />
      <Stepper.Step allowStepSelect={ false } icon={<IoCheckmarkDone fontSize='1.25rem'/>} label='Confirm password' />
    </Stepper>
  )
}

export default SetupStepper