import React from 'react';

// mantine components
import { Divider, Group, Text, Title } from '@mantine/core';

// translation
import useTranslation from 'next-translate/useTranslation'

// icons
import { IoSettings } from 'react-icons/io5';

const PathItem = ({ path, icon= null, marginRight= false }:{ path: string, icon?: JSX.Element | null, marginRight?: boolean }) => {
  return (
    <Text sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
      {
        icon && icon
      }
      <Text 
        component='span' 
        sx={(theme) => ({
          marginLeft: icon !== null ? theme.spacing.xs : 0,
          marginRight: marginRight ? theme.spacing.xs : 0,
          fontSize: theme.fontSizes.sm
        })}>
        { path }
      </Text>
      {
        marginRight ? `>` : null
      }
    </Text>
  )
}

function ConnectPromptNoNode() {
  const { t } = useTranslation('connect');
  const { t: commonT } = useTranslation('common')

  return (
    <div>
      <Title mb='xl' order={1}>
        { t('noNode') }
      </Title>
      <Text my='md'>
        { t('noNodeText') }
      </Text>
      <Divider  />
      <Text mt='xl' size='sm'>
        { t('noNodeTextPath') }
      </Text>
      <Group mt='xs'>
        <PathItem
          icon={<IoSettings />}
          path={ commonT('settings') }
          marginRight
        />
        <PathItem
          path={ commonT('connect') }
        />
      </Group>
    </div>
  )
}

export default ConnectPromptNoNode