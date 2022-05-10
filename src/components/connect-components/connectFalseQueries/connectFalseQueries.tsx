import React from 'react'

// mantine components
import { Box, Text, Title, createStyles } from '@mantine/core';

// components
import Link from '@/components/link';

// translation
import useTranslation from '@/translation/useTranslation';;
import Trans from '@/translation/Trans';

// styles
const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '60vh'
  },
  title: {
    marginBottom: theme.spacing.xl
  },
  text: {
    flexGrow: 1
  },
  errorBox: {
    background: theme.colors.dark[5],
    color: theme.colors.gray[3],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    fontSize: theme.fontSizes.sm
  }
}))

interface Props {
  errorCode: 'falseQueries' | 'noNode'
}
const ConnectFalseQueries = ({ errorCode }: Props ) => {
  const { classes } = useStyles();
  const { t } = useTranslation('connect-data');

  return (
    <Box className={ classes.main } >
      <Title className={ classes.title }  order={3} mb='xl'>
        { t('wentWrong') }
      </Title>
      <Trans
        ns='connect-data'
        i18nKey='backToIndex'
        components={[
          <Text key={0} className={ classes.text } />,
          <Link key={1} path='/connect' />
        ]}
      />
      <Box className={ classes.errorBox } >
        Error Code: { errorCode }
      </Box>
    </Box>
  )
}

export default ConnectFalseQueries