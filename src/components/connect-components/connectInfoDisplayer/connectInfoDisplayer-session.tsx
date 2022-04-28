import React from 'react'
import { Button, Box, Title, Group, Text, createStyles } from '@mantine/core';
import { ChildProps as Props } from './connectInfoDisplayer-interface';
import { IoInformationCircle, IoIdCard, IoKey } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';

const useStyles = createStyles((theme) => ({
  group: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    '&:not(:last-child)': {
      marginBottom: theme.spacing.xl * 1.5
    }
  },
  button: {
    fontWeight: '400', 
    fontSize: '.9rem',
    maxWidth: '100%',
    overflow: 'hidden'
  }
}));

function ConnectInfoDisplayerSession({ id, secret, onCopy }: Props ) {
  const { classes } = useStyles();
  const { t } = useTranslation('connect-info-displayer');

  return (
    <Box>
      <Group mb='md'>
        <IoInformationCircle />
        <Title order={ 4 }>
          { t('sessionDetails') }
        </Title>
      </Group>
      <Group className={ classes.group }>
        <Text>
          Id:
        </Text>
        <Button leftIcon={ <IoIdCard /> } className={ classes.button } onClick={ () => onCopy(id) } variant='light' color='gray'>
          { id }
        </Button>
      </Group>
      <Group className={ classes.group }>
        <Text>
          Secret:
        </Text>
        <Button leftIcon={ <IoKey /> } className={ classes.button } onClick={ () => onCopy(secret) } variant='light' color='gray'>
          { secret }
        </Button>
      </Group>
    </Box>
  )
}

export default ConnectInfoDisplayerSession