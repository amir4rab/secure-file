import { Box, Group, Title, Text, Button, Divider, createStyles, RingProgress, Center } from '@mantine/core';

import useAuth from '@/hooks/useAuth';
import BackToButton from '@/components/backToButton';
import useStorageQuota from '@/hooks/useStorageQuota';
import { readableSize } from '@/utils/frontend/fileUtils';

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
  }
}))

function AccountSettings() { 
  const { singout } = useAuth();
  const { quota, usage } = useStorageQuota();
  const { classes } = useStyles();

  return (
    <Box>
      <Group className={ classes.header }>
        <BackToButton route='/app/settings' />
        <Title order={1}>
          Account
        </Title>
      </Group>
      <Group className={ classes.settingGroup } >
        <Title order={3}>Storage usage</Title>
        <Text className={ classes.textInfo }>
          {`Currently you are using ${ readableSize(usage) } of ${ readableSize(quota) } space on your browser`}
        </Text>
        <Center>
          <RingProgress
            size={ 90 }
            sections={[{ value: parseInt((usage / quota * 100).toFixed(0)), color: 'blue' }]}
            label={ <Text color='blue' weight={700} align='center'>{ (usage / quota * 100).toFixed(0) + '%' }</Text> }
          />
          <Text className={ classes.textInfo }>
            Usage percentage
          </Text>
        </Center>
      </Group>
      <Divider my='lg' variant='dotted' />
      <Group className={ classes.settingGroup }>
        <Title className={ classes.warningInfo } order={3}>Account actions</Title>
        <Text className={ classes.textInfo }>
          You can manually log out or just close your browser
        </Text>
        <Box className={ classes.alignToRight }>
          <Button onClick={ () => singout() } size='xs' variant='light' color='yellow'>Logout</Button>
        </Box>
      </Group>
      <Divider my='lg' variant='dotted' />
      <Group className={ classes.settingGroup }>
        <Title order={3} className={ classes.dangerInfo }>Danger Zone</Title>
        <Text className={ classes.textInfo }>
          Keep in mind by doing this, all of your files inside Secure file will be deleted!
        </Text>
        <Box className={ classes.alignToRight }>
          <Button size='xs' onClick={ () => singout('complete') } variant='light' color='red'>Reset All</Button>
        </Box>
      </Group>
    </Box>
  )
}

export default AccountSettings