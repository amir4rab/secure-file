import React, { useState } from 'react';

// mantine components
import { Box, Group, Title, Text, createStyles, TextInput, Button, LoadingOverlay, Notification } from '@mantine/core';

// components
import BackToButton from '@/components/backToButton';

// icons
import { IoServer } from 'react-icons/io5';

// hooks
import useInit from '@/hooks/useInit';
import useTimeout from '@/hooks/useTimeout';
import { useForm } from '@mantine/form';

// translation
import useTranslation from 'next-translate/useTranslation';

// styles
const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex', 
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2
  },
  settingGroup: {
    flexDirection: 'column',
    alignContent: 'flex-start', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
  },
  textInfo: {
    color: theme.colors.gray[5]
  },
  dangerInfo: {
    color: theme.colors.red[7]
  },
  warningInfo: {
    color: theme.colors.yellow[7]
  },
  alignToRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    width: '100%'
  },
  input: {
    [ theme.fn.largerThan('md') ]: {
      maxWidth: '500px'
    }
  },
  notification: {
    position: 'fixed',
    left: '50%',
    top: '1rem',
    transition: 'transform .3s ease-in-out, opacity .3s ease-in-out',
    minWidth: '300px',
    zIndex: 1
  },
  display: {
    transform: 'translate( -50% ,0)',
    opacity: 1
  },
  hide: {
    transform: 'translate( -50% , -2rem)',
    opacity: 0,
    pointerEvents: 'none'
  }
}))

function ConnectSettings() {
  const { classes } = useStyles();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentNode, setCurrentNode ] = useState< string >('');
  const [ saved, setSaved ] = useState(false);
  const timeout = useTimeout();

  const { t } = useTranslation('app-settings');
  const { t: commonT } = useTranslation('common');

  const form = useForm({
    initialValues: {
      node: '',
    },

    validate: {
      node: (value) => (
        value.startsWith('https://') ? null : 
          value.startsWith('http://localhost:') || value.startsWith('localhost:') ? null : t('invalidNode')
      ),
    },
  });

  useInit(() => {
    const currentNode = window.localStorage.getItem('connectNode');
    if ( currentNode !== null ) {
      form.setFieldValue('node', currentNode)
      setCurrentNode(currentNode);
    };
    setIsLoading(false)
  }, false);

  const submitEvent = ( node: string ) => {
    setIsLoading(true);

    window.localStorage.setItem('connectNode', node);
    setCurrentNode(node);
    
    setSaved(true);
    timeout.set(() => setSaved(false), 3000);

    setIsLoading(false);
  };
  
  return (
    <Box>
      <LoadingOverlay visible={ isLoading } />
      
      <Notification 
        onClose={ () => setSaved(false) } 
        title={ t('saved') }
        className={[ classes.notification, saved ? classes.display : classes.hide ].join(' ')}
        radius='md'
      >
        { t('nodeSavedText') }
      </Notification>
      <Group className={ classes.header }>
        <BackToButton route='/app/settings' />
        <Title order={1}>
          { t('connect') }
        </Title>
      </Group>
      <Group className={ classes.settingGroup }>
        <Title order={3}>{ t('node') }</Title>
        <Text my='sm' className={ classes.textInfo }>{ t('nodeText') }</Text>
        <form onSubmit={ form.onSubmit(({ node }) => submitEvent(node.trim())) } className={ classes.form }>
          <TextInput
            required
            className={ classes.input }
            icon={ <IoServer /> }
            placeholder='https://eg.secure-file.amir4rab.com'
            {...form.getInputProps('node')}
          />
          <Group mt='md' position='right' sx={{ width: '100%' }}>
            <Button disabled={ currentNode === form.values.node } type='submit'>
              { currentNode === '' ? commonT('submit') : commonT('change') }
            </Button>
          </Group>
        </form>
      </Group>
    </Box>
  )
}

export default ConnectSettings