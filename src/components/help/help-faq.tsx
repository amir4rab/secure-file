import React from 'react'
import { Accordion, Box, createStyles, Title, TypographyStylesProvider } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

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

const faqContent = [
  {
    title: 'betterComp',
    text: 'betterCompText',
    componentsArray: [<p key={0}/>, <a href='https://www.veracrypt.fr' target='_blank' rel='noreferrer' key={1}/>],
  },
  {
    title: 'howSafe',
    text: 'howSafeText',
    componentsArray: [<p key={0}/>]
  },
  {
    title: 'sourceCode',
    text: `sourceCodeText`,
    componentsArray: [<p key={0}/>]
  }
]

function HelpFaq() {
  const { classes } = useStyles();
  const { t } = useTranslation('help');

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
          faqContent.map(({ text, title, componentsArray }) => (
            <Accordion.Item label={ t(title) } key={title}>
              <TypographyStylesProvider>
                <Trans 
                  i18nKey={ 'help:' + text }
                  components={componentsArray}
                />
                {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
              </TypographyStylesProvider>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </Box>
  )
}

export default HelpFaq