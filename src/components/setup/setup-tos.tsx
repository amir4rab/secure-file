import { Title, TypographyStylesProvider, Box, ScrollArea, Center, Checkbox, Button, Text } from '@mantine/core'
import React, { useState } from 'react'

const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nisl purus in mollis nunc. Mauris commodo quis imperdiet massa tincidunt nunc. Scelerisque eleifend donec pretium vulputate sapien nec. Fringilla urna porttitor rhoncus dolor. Facilisis volutpat est velit egestas dui id ornare. Sem viverra aliquet eget sit amet tellus cras. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Phasellus faucibus scelerisque eleifend donec pretium. Posuere ac ut consequat semper viverra nam libero justo laoreet. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Elementum pulvinar etiam non quam lacus suspendisse. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Morbi tristique senectus et netus et malesuada fames ac turpis. Ac orci phasellus egestas tellus rutrum tellus pellentesque.

Imperdiet proin fermentum leo vel orci porta non. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Eget arcu dictum varius duis. Ornare aenean euismod elementum nisi. Consequat ac felis donec et odio pellentesque diam volutpat. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Fermentum leo vel orci porta non pulvinar neque. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Dignissim cras tincidunt lobortis feugiat vivamus at. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Semper viverra nam libero justo. Facilisis sed odio morbi quis commodo odio. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Congue nisi vitae suscipit tellus. Varius morbi enim nunc faucibus a pellentesque. Adipiscing tristique risus nec feugiat in fermentum. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Eu mi bibendum neque egestas. Dictum non consectetur a erat nam at.

Sed elementum tempus egestas sed sed risus. Adipiscing tristique risus nec feugiat in fermentum posuere urna nec. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. At erat pellentesque adipiscing commodo elit at imperdiet dui. Enim ut sem viverra aliquet eget sit amet tellus. Sollicitudin tempor id eu nisl. Ut pharetra sit amet aliquam id diam. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Massa ultricies mi quis hendrerit dolor magna. Volutpat est velit egestas dui id ornare arcu odio ut. Vel pharetra vel turpis nunc eget lorem dolor. Ornare massa eget egestas purus viverra accumsan in. Dui id ornare arcu odio ut sem. At in tellus integer feugiat. Purus in mollis nunc sed id semper risus.

Feugiat sed lectus vestibulum mattis. Eget sit amet tellus cras adipiscing. Massa id neque aliquam vestibulum. Donec et odio pellentesque diam volutpat commodo sed. Mi quis hendrerit dolor magna eget est lorem ipsum. Malesuada pellentesque elit eget gravida cum sociis natoque. Fermentum iaculis eu non diam phasellus. Faucibus pulvinar elementum integer enim neque volutpat ac. Eu volutpat odio facilisis mauris sit. Nec feugiat nisl pretium fusce id velit. Bibendum neque egestas congue quisque egestas diam in. In metus vulputate eu scelerisque felis. Eu mi bibendum neque egestas congue quisque egestas. Egestas sed tempus urna et pharetra pharetra massa. Orci ac auctor augue mauris augue.

Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Eu facilisis sed odio morbi. Sed ullamcorper morbi tincidunt ornare. Lectus arcu bibendum at varius vel pharetra. Dictumst quisque sagittis purus sit amet volutpat. Amet nulla facilisi morbi tempus. Fermentum odio eu feugiat pretium nibh. Consectetur libero id faucibus nisl tincidunt eget. At augue eget arcu dictum. Eleifend quam adipiscing vitae proin sagittis nisl. Laoreet id donec ultrices tincidunt arcu non. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. In fermentum et sollicitudin ac orci phasellus egestas tellus. Sapien faucibus et molestie ac feugiat sed. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Odio ut enim blandit volutpat maecenas volutpat. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Eget est lorem ipsum dolor sit.`;

const SetupTos = ({ goNext, tosContent= '' }:{ goNext: () => void, tosContent?: string }) => {
  const [ acepted, setAcepted ] = useState(false);

  return (
    <Box py='md'>
      <Title order={3} my='md'>Terms of service</Title>
      <ScrollArea p='lg' style={{ height: '30vh' }}>
        {
          tosContent !== '' ?
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: tosContent }} />
          </TypographyStylesProvider> : null
        }
        {
          tosContent === '' ?
          <TypographyStylesProvider>
            { loremIpsumText }
          </TypographyStylesProvider> : null
        }
      </ScrollArea>
      <Center sx={{ justifyContent: 'flex-start' }}>
        <Checkbox checked={acepted} onChange={ () => setAcepted(!acepted) } label='I have accepted terms of service' />
      </Center>
      <Center mt='md' sx={{ justifyContent: 'flex-end' }}>
        <Button disabled={ !acepted } onClick={ goNext }>
          Next
        </Button>
      </Center>
    </Box>
  )
}

export default SetupTos