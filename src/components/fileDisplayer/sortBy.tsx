import { Menu, Button } from '@mantine/core';
import React, { useState } from 'react'
import { IoFunnel } from 'react-icons/io5';

const menuValues = [
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Alphabet',
    value: 'alphabet'
  },
  {
    label: 'Size',
    value: 'size'
  }
]

interface Props {
  setSortBy: ( value: string ) => void;
  sortBy: string;
}

function SortBy({ setSortBy, sortBy }: Props) {

  const getLabel = (value: string) => {
    const selectedItem = menuValues.find(item => item.value === value);
    return selectedItem?.label;
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
            { item.label }
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default SortBy