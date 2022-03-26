import { Center, Group, Title, Text, Button } from '@mantine/core'
import React, { ReactNode } from 'react'
import { IoHome, IoInformation, IoHelp, IoPerson } from 'react-icons/io5'
import { NextRouter, useRouter } from 'next/router';
import ErrorWrapper from './errorWrapper';

const LinkItem = ({ children, href, router, leftIcon }:{ children: string, href: string, router: NextRouter, leftIcon?: JSX.Element }) => {
  const clickHandler = () => {
    router.push(href);
  }
  return (
    <Button
      color="gray" radius="md"
      onClick={ clickHandler } 
      leftIcon={ leftIcon }
      sx={{ width: 'calc(50% - 1rem)', margin: '.5rem', svg: { fontSize: '1rem' } }}
    >
      {children}
    </Button>
  )
}

function NotFoundComponent() {
  const router = useRouter()

  return (
    <ErrorWrapper code='404'>
      <Center sx={{ minHeight: '50vh', flexDirection: 'column' }}>
        <Group sx={{ flexDirection: 'column' }}>
          <Title align='center' order={1}>
            Sorry this page does not exists
          </Title>
        </Group>
        <Group sx={{ paddingTop: '5vh', flexDirection: 'column' }}>
          <Text>Here our couple of existing places</Text>
          <Center sx={{ width: '100%', flexWrap: 'wrap' }}>
            <LinkItem href='/' router={ router } leftIcon={ <IoHome /> }>
              home
            </LinkItem>
            <LinkItem href='/app' router={ router } leftIcon={ <IoPerson /> }>
              Account
            </LinkItem>
            <LinkItem href='/help' router={ router } leftIcon={ <IoHelp /> }>
              Help
            </LinkItem>
            <LinkItem href='/about' router={ router } leftIcon={ <IoInformation /> }>
              About
            </LinkItem>
          </Center>
        </Group>
      </Center>
    </ErrorWrapper>
  )
}

export default NotFoundComponent