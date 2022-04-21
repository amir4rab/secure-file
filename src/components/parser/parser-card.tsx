import { Box, Paper, Text, createStyles, ThemeIcon, Title, Button } from '@mantine/core'
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    background: theme.colors.gray[8],
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    position: 'relative',
    padding: `${theme.spacing.xl}px ${theme.spacing.xl}px ${theme.spacing.xl}px calc(${theme.spacing.xl}px + .5rem)`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '.5rem',
      backgroundImage: theme.fn.linearGradient(0, theme.colors.blue[4], theme.colors.blue[7]),
    },
  },
  text: {
    paddingTop: theme.spacing.md
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: theme.fontSizes.xl * 1.25
  },
  cardIcon: {
    backgroundImage: theme.fn.linearGradient(45, theme.colors.blue[4], theme.colors.blue[7]),
  },
  buttonArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

interface Props { 
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
  prompt: string;
}
const ParserCard = ({ title, description, icon, path, prompt }: Props ) => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Paper className={ classes.card } >
      <Box className={ classes.cardHeader }>
        <ThemeIcon className={ classes.cardIcon } radius='md' size='xl' color='teal'>
          { icon }
        </ThemeIcon>
        <Title className={ classes.cardTitle } order={3} ml='sm'>
          { title }
        </Title>
      </Box>
      <Text className={ classes.text }>
        { description }
      </Text>
      <Box className={ classes.buttonArea }>
        <Button onClick={ () => router.push( router.pathname + path ) } mt='lg'>
          { prompt }
        </Button>
      </Box>
    </Paper>
  )
};

export default ParserCard