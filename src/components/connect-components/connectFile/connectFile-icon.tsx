import React from 'react'

// mantine components //
import { createStyles, ThemeIcon } from '@mantine/core';

// icons //
import { IoMusicalNotes, IoDocument, IoFilm, IoImage, IoHelp } from 'react-icons/io5';

// utils //
import { getFormat } from '@/utils/frontend/fileUtils';
import { getFamilyFormat } from '@/utils/frontend/mediaFormats';


const useStyles = createStyles(( theme ) => ({
  icon: {
    color: theme.colors.dark[7]
  },
  audioIcon: {
    background: `hsl(${300}, 200%, 87.5%)`
  },
  videoIcon: {
    background: `hsl(${150}, 200%, 87.5%)`
  },
  imageIcon: {
    background: `hsl(${240}, 200%, 87.5%)`
  },
  documentIcon: {
    background: `hsl(${10}, 200%, 87.5%)`
  },
  unknown: {
    background: `hsl(${190}, 200%, 87.5%)`
  }
}))

interface Props {
  name: string
};
const ConnectFileIcon = ( { name }: Props ) => {
  const { classes } = useStyles();

  switch( getFamilyFormat(getFormat(name)) ) {
    case 'audio': return (
      <ThemeIcon radius='md' size='xl' className={ classes.audioIcon }>
        <IoMusicalNotes className={ classes.icon }/>
      </ThemeIcon>
    );
    case 'video': return (
      <ThemeIcon radius='md' size='xl' className={ classes.videoIcon }>
        <IoFilm className={ classes.icon }/>
      </ThemeIcon>
    );
    case 'image': return (
      <ThemeIcon radius='md' size='xl' className={ classes.imageIcon }>
        <IoImage className={ classes.icon }/>
      </ThemeIcon>
    );
    case 'document': return (
      <ThemeIcon radius='md' size='xl' className={ classes.documentIcon }>
        <IoDocument className={ classes.icon }/>
      </ThemeIcon>
    );
    default: return (
      <ThemeIcon radius='md' size='xl' className={ classes.unknown }>
        <IoHelp className={ classes.icon }/>
      </ThemeIcon>
    );
  }
};

export default ConnectFileIcon