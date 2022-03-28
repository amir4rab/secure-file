import React from 'react'
import { Accordion, Box, createStyles, Title, TypographyStylesProvider } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const control = getRef('control');

  return {
    title: {
      fontWeight: 400,
      marginBottom: theme.spacing.xl,
    },

    control: {
      ref: control,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    item: {
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing.lg,

      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]
      }`,
    },

    itemOpened: {
      [`& .${control}`]: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
      },
    },
  };
});

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

const faqContent = [
  {
    'title': 'Is there any better competitor to this web app',
    'text': `<p>the best well known competitor is <a href='https://www.veracrypt.fr' target='_blank' rel='noreferrer'>VeraCrypt</a>, but is is't multi platform.</p>`
  },
  {
    'title': 'How safe is Secure file',
    'text': `<p>Secure file isn't suited to individuals with high security concerns, it's designed for normal people with low security concerns.</p>`
  },
  {
    'title': 'Source Code',
    'text': `<p>Feel free to check about page an peak into our source code.</p>`
  }
]

function HelpFaq() {
  const { classes } = useStyles();

  return (
    <Box>
      <Title my='xl' order={3}>
        Frequently asked questions
      </Title>
      <Accordion
        iconPosition="right"
        classNames={{
          item: classes.item,
          itemOpened: classes.itemOpened,
          control: classes.control,
        }}
      >
        {
          faqContent.map(({ text, title }) => (
            <Accordion.Item label={title} key={title}>
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </TypographyStylesProvider>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </Box>
  )
}

export default HelpFaq