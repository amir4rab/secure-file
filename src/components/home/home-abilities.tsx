import React from 'react';
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, Center } from '@mantine/core';
import { IoShield, IoRepeat, IoPhonePortrait, IoFlash, IoHardwareChip, IoLogoEuro, IoCodeSlash } from 'react-icons/io5'

const dataArr = [
  { title: 'Store Files', icon: IoShield, color: 'violet' },
  { title: 'Send/Receive Files', icon: IoRepeat, color: 'indigo' },
  { title: 'Multi platform', icon: IoPhonePortrait, color: 'pink' },
  { title: 'Fast', icon: IoFlash, color: 'blue' },
  { title: 'Open source', icon: IoCodeSlash, color: 'green' },
  { title: 'Multi threated', icon: IoHardwareChip, color: 'teal' },
  { title: 'Free', icon: IoLogoEuro, color: 'cyan' },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    [theme.fn.largerThan('md')]: {
      minWidth: '50vw',
    }
  },

  title: {
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
      cursor: 'default'
    },
  },
}));

function HomeAbilities() {
  const { classes, theme } = useStyles();

  const items = dataArr.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Key features</Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            and many more coming soon
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </Center>
  );
}

export default HomeAbilities