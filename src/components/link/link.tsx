import React, { MouseEventHandler } from 'react'
import Link from 'next/link';
import { Anchor, CSSObject } from '@mantine/core';

interface Props {
  children?: JSX.Element | string;
  path: string;
  sx?: CSSObject;
  onClick?: MouseEventHandler;
  className?: string;
}

const CustomLink = ( props: Props ) => {
  return (
    <Link href={ props.path } passHref>
      <Anchor className={ props.className } {...props}></Anchor>
    </Link>
  );
}

export default CustomLink