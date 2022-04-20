import React from 'react';
import { Stepper } from '@mantine/core';

import { IoBook, IoKey, IoCheckmarkDone, IoCheckmarkCircle } from 'react-icons/io5';

import useTranslation from 'next-translate/useTranslation';

function SetupStepper({ active, setActive }:{ active: number, setActive: (a: number) => void }) {
  const { t } = useTranslation('setup');

  return (
    <Stepper py='xl' active={active} onStepClick={setActive} completedIcon={<IoCheckmarkCircle fontSize='1.5rem' />}
      sx={(theme) => ({
        [theme.fn.smallerThan('md')]: {
          overflowX: 'scroll',
          maxWidth: '100%',
        }
      })}
    >
      <Stepper.Step allowStepSelect={ false } icon={<IoBook fontSize='1.25rem'/>} label={ t('tos') } />
      <Stepper.Step allowStepSelect={ false } icon={<IoKey fontSize='1.25rem'/>} label={ t('chosePassword') } />
      <Stepper.Step allowStepSelect={ false } icon={<IoCheckmarkDone fontSize='1.25rem'/>} label={ t('confirmPassword') } />
    </Stepper>
  )
}

export default SetupStepper