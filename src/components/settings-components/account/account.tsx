import { Box, Group, Title, Text, Button, Divider, createStyles, RingProgress, Center } from '@mantine/core';

import useAuth from '@/hooks/useAuth';
import BackToButton from '@/components/backToButton';
import useStorageQuota from '@/hooks/useStorageQuota';
import { readableSize } from '@/utils/frontend/fileUtils';
import useTranslation from '@/translation/useTranslation';;
import Trans from '@/translation/Trans';

import { useBrowserInfo } from '@/hooks/useBrowserInfo/useBrowserInfo';

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
  const { t } = useTranslation('app-settings');
  const { checkSupport, isLoading: browserInfoIsLoading } = useBrowserInfo();

  return (
    <Box>
      <Group className={ classes.header }>
        <BackToButton route='/app/settings' />
        <Title order={1}>
          { t('account') }
        </Title>
      </Group>
      {
        checkSupport('file') && !browserInfoIsLoading ? 
        <Group className={ classes.settingGroup } >
          <Title order={3}>{ t('storageUsage') }</Title>
          <Text className={ classes.textInfo }>
            <Trans
              ns='app-settings'
              i18nKey='storageUsageText'
              values={{
                usage: readableSize(usage),
                quota: readableSize(quota)
              }}
            />
          </Text>
          <Center>
            <RingProgress
              size={ 90 }
              sections={[{ value: quota === 0 ? 0 : parseInt((usage / quota * 100).toFixed(0)), color: 'blue' }]}
              label={ <Text color='blue' weight={700} align='center'>{ quota === 0 ? `0%` : (usage / quota * 100).toFixed(0) + '%' }</Text> }
            />
            <Text className={ classes.textInfo }>
              { t('usagePercentage') }
            </Text>
          </Center>
        </Group> : null
      }
      <Divider my='lg' variant='dotted' />
      <Group className={ classes.settingGroup }>
        <Title className={ classes.warningInfo } order={3}>{ t('accountActions') }</Title>
        <Text className={ classes.textInfo }>
          { t('accountActionsText') }
        </Text>
        <Box className={ classes.alignToRight }>
          <Button onClick={ () => singout() } size='xs' variant='light' color='yellow'>{ t('accountActionsPrompt') }</Button>
        </Box>
      </Group>
      <Divider my='lg' variant='dotted' />
      <Group className={ classes.settingGroup }>
        <Title order={3} className={ classes.dangerInfo }>{ t('dangerZone') }</Title>
        <Text className={ classes.textInfo }>
          { t('dangerZoneText') }
        </Text>
        <Box className={ classes.alignToRight }>
          <Button size='xs' onClick={ () => singout('complete') } variant='light' color='red'>{ t('dangerZonePrompt') }</Button>
        </Box>
      </Group>
    </Box>
  )
}

export default AccountSettings