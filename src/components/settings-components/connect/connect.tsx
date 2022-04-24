import { Box, Group, Title, Text, createStyles } from '@mantine/core';

import BackToButton from '@/components/backToButton';
import useTranslation from 'next-translate/useTranslation';

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

function ConnectSettings() {
  const { classes } = useStyles();
  const { t } = useTranslation('app-settings')

  return (
    <Box>
      <Group className={ classes.header }>
        <BackToButton route='/app/settings' />
        <Title order={1}>
          { t('connect') }
        </Title>
      </Group>
      <Group className={ classes.settingGroup }>
        <Title order={3}>Coming soon</Title>
        <Text className={ classes.textInfo }>
          { t('connectIsComing') }
        </Text>
      </Group>
    </Box>
  )
}

export default ConnectSettings