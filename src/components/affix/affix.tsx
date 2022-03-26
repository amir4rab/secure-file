import React from 'react'
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, MediaQuery, Text, Transition } from '@mantine/core';
import { IoArrowUp } from 'react-icons/io5'

function CustomAffix() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<IoArrowUp />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
                variant='light'
                color='gray'
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </MediaQuery>
    </>
  )
}

export default CustomAffix