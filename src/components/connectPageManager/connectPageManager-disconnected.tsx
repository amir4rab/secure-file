import React from 'react'

// mantine components
import { Title, Text, createStyles } from '@mantine/core'

// translation
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

// components
import Link from '@/components/link';
import BackToButton from '../backToButton';

// styles
const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  }
}))

interface Props {
  disconnected?: boolean
}
const ConnectPageManagerDisconnected = ( { disconnected= false }: Props ) => {
  const { t } = useTranslation('connect-data');
  const { classes } = useStyles();

  if ( !disconnected ) {
    return (
      <div>
        <div className={ classes.header }>
          <BackToButton route='/connect'/>
          <Title order={2}>
            { t('unableToConnect') }
          </Title>
        </div>
        <Text>
          { t('unableToConnectText') }
        </Text>
        <Trans
          i18nKey='connect-data:backToIndex'
          components={[
            <Text key={0}/>,
            <Link key={1} path='/connect' />
          ]}
        />
      </div>
  )
  }

  return (
    <div>
      <div className={ classes.header }>
        <BackToButton route='/connect'/>
        <Title order={2}>
          { t('sessionEnd') }
        </Title>
      </div>
      <Text>
        { t('sessionEndText') }
      </Text>
      <Trans
        i18nKey='connect-data:backToIndex'
        components={[
          <Text key={0}/>,
          <Link key={1} path='/connect' />
        ]}
      />
    </div>
  )
}

export default ConnectPageManagerDisconnected