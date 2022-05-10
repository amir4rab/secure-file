import { Menu, Button } from '@mantine/core';
import useTranslation from '@/translation/useTranslation';;
import React, { useState } from 'react'
import { IoFunnel } from 'react-icons/io5';

const menuValues = [
  {
    value: 'default'
  },
  {
    value: 'alphabet'
  },
  {
    value: 'size'
  }
]

interface Props {
  setSortBy: ( value: string ) => void;
  sortBy: string;
}

function SortBy({ setSortBy, sortBy }: Props) {
  const { t } = useTranslation('file-displayer');
  const getLabel = (value: string) => {
    const selectedItem = menuValues.find(item => item.value === value);
    return t(selectedItem?.value as string);
  }

  return (
    <Menu 
      control={ <Button leftIcon={ <IoFunnel /> } size='xs' variant='light' color='gray' >{ getLabel(sortBy)}</Button> }
      transition='pop'
    >
      {
        menuValues.map(item => (
          <Menu.Item
            onClick={() => setSortBy(item.value)}
            key={ item.value }
            
          >
            { t(item.value) }
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default SortBy