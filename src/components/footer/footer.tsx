/* eslint-disable @next/next/no-img-element */
import { ActionIcon, Group, Text, createStyles, Portal, Container } from '@mantine/core'
import { SiGithub, SiTwitter } from 'react-icons/si';

const useStyles = createStyles((theme) => ({
  footer: {
    background: theme.colors.dark[6],
    padding: `${theme.spacing.xl}px 0`,
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  group: {
    [theme.fn.smallerThan('md')]: {
      ':not(:last-child)': {
        marginBottom: theme.spacing.md
      },
      ':last-child': {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }
  }
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <Portal>
      <footer className={ classes.footer }>
        <Container className={ classes.wrapper }>
          <Group className={ classes.group }>
            <img src='/favicon.svg' alt='logo' width={32} height={32} />
            <Text component='span'>
              Secure File
            </Text>
            <Text size='xs' component='span' sx={{ opacity: .8 }}>
              © 2021 secure-file.amir4rab.com All rights reserved.
            </Text>
          </Group>
          <Group className={ classes.group }>
            <ActionIcon component='a'  href='https://github.com/amir4rab/secure-file' target='_blank' rel='noreferrer'>
              <SiGithub />
            </ActionIcon>
            <ActionIcon component='a'  href='https://github.com/amir4rab/secure-file' target='_blank' rel='noreferrer'>
              <SiTwitter />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    </Portal>
  )
}

export default Footer