import React, { MouseEventHandler } from 'react'
import Link from 'next/link';
import { Anchor, CSSObject } from '@mantine/core';

interface Props {
  children?: JSX.Element | string;
  path: string;
  sx?: CSSObject;
  onClick?: MouseEventHandler;
}

const CustomLink = ({ children, path, sx={}, onClick= () => {} }: Props) => {
  return (
    <Link href={ path } passHref>
      <Anchor onClick={ onClick } sx={ sx }>{ children }</Anchor>
    </Link>
  );
}

export default CustomLink