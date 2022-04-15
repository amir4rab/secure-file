import { Box, Group, Title, Text, createStyles } from '@mantine/core';

import BackToMenu from '@/components/settings-components/backToMenu';

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

  return (
    <Box>
      <Group className={ classes.header }>
        <BackToMenu />
        <Title order={1}>
          Account
        </Title>
      </Group>
      <Group className={ classes.settingGroup }>
        <Title order={3}>Coming soon</Title>
        <Text className={ classes.textInfo }>
          Connect settings will be added in feature
        </Text>
      </Group>
    </Box>
  )
}

export default ConnectSettings