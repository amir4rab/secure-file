import { Text, Center, Input, createStyles } from '@mantine/core'
import { ChangeEvent } from 'react';

import SortBy from './sortBy';
import { IoSearch } from 'react-icons/io5';
import useTranslation from '@/translation/useTranslation';;

interface Props {
  setSortedBy: (a: string) => void;
  sortedBy: string;
  setSearchInputValue: (a: string) => void;
  searchInputValue: string;
};

const useStyles = createStyles((theme) => ({
  header: {
    justifyContent: 'space-between', 
    width: '100%', 
    paddingBottom: theme.spacing.md, 
    position: 'sticky', 
    top: '0',
    zIndex: 10,
    background: theme.colors.dark[7],
    padding: `${theme.spacing.lg}px 0`,
    [theme.fn.largerThan('md')]: {
      top: 'calc(10vh+2rem)',
    }
  }
})); 

function FileDisplayerHeader({ setSortedBy ,sortedBy, setSearchInputValue, searchInputValue }: Props) {
  const { classes } = useStyles();
  const { t } = useTranslation('file-displayer');
  const { t: commonT } = useTranslation('common');

  return (
    <Center className={ classes.header }>
      <Center sx={{ width: '100%', justifyContent: 'flex-start' }}>
        <Text mr='sm'>
          { t('sortBy') }
        </Text>
        <SortBy setSortBy={ setSortedBy } sortBy={ sortedBy } />
      </Center>
      <Input radius='xl' onChange={ (e: ChangeEvent<HTMLInputElement>) => setSearchInputValue(e.target.value) } value={ searchInputValue } icon={ <IoSearch /> } placeholder={ commonT('searchField') } />
    </Center>
  )
}

export default FileDisplayerHeader