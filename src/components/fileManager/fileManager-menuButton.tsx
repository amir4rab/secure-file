import { Group, UnstyledButton, Menu, createStyles, MediaQuery, Text } from '@mantine/core';
import { IoDocument, IoAddCircle, IoFolderOpen } from 'react-icons/io5'

import { CurrentRout } from '@/types/useFileManager';
import useTranslation from 'next-translate/useTranslation';

const useStyles = createStyles((theme) => ({
  addButton: {
    background: theme.colors.blue[5], 
    padding: '.25rem', 
    borderRadius: '50%',
    transition: '0.3s ease-in-out background',
    [theme.fn.largerThan('md')]: {
      borderRadius: theme.radius.lg,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      padding: `${theme.spacing.xs / 2}px ${theme.spacing.sm}px`,
    },
    ':disabled': {
      background: theme.colors.dark[3], 
    },
    ':hover': {
      background: theme.colors.blue[4], 
    },
    ':active': {
      background: theme.colors.blue[2], 
    }
  },
  menu: {
    position: 'fixed', 
    right: '1.25rem', 
    bottom: '6rem',
    zIndex: 25,
    [theme.fn.largerThan('md')]: { 
      right: 'calc(calc(100vw - 960px)/2)',
      bottom: '4rem',
    }
  },
  buttonText: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    },
    paddingLeft: theme.spacing.xs / 2,
    color: theme.colors.dark[7],
    fontWeight: 500
  },
  icon: {
    color: theme.colors.dark[7],
    fontSize: '2rem',
    [theme.fn.largerThan('md')]: { 
      fontSize: '1.75rem'
    }
  }
}));

interface Props {
  openAddFileModal: () => void, 
  openAddFolderModal: () => void, 
  currentRout: CurrentRout,
  disabled: boolean
}

const MenuButton = ( { disabled, openAddFileModal, openAddFolderModal, currentRout }: Props ) =>  {
  const { classes } = useStyles();
  const { t } = useTranslation('file-manager');

  return (
    <Menu
      control={
        <UnstyledButton disabled={ disabled } className={ classes.addButton }>
          <Group>
            <IoAddCircle className={ classes.icon } />
          </Group>
          <Text className={ classes.buttonText }>{ t('addItem') }</Text>
        </UnstyledButton>
      }
      className={ classes.menu }
    >
      <Menu.Item onClick={ openAddFileModal } icon={<IoDocument />}>{ t('addFile') }</Menu.Item>
      {/* Adding folders with more than 0 has been disabled Temporarily */}
      <Menu.Item onClick={ openAddFolderModal } icon={<IoFolderOpen />} disabled={ currentRout.length > 1 }>{ t('addFolder') }</Menu.Item>
    </Menu>
  );
};

export default MenuButton;