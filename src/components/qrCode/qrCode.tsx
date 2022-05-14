import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Box, Text, Title, createStyles, Image, useMantineTheme, Loader, Center } from '@mantine/core';
import qrCodeGenerator from '@/utils/frontend/qrCodeGenerator';
import Trans from '@/translation/Trans';

const useStyles = createStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  imageWrapper: {
    width: '50%',
    background: theme.colors.gray[3],
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl,
    [theme.fn.smallerThan('md')]: {
      width: '100%'
    }
  },
  loader: {
    width: '100%'
  },
  text: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.sm,
    textAlign: 'center',
    color: theme.colors.dark[7]
  }
}));

interface Props {
  value: string;
  onCopy: ( value: string, copy?: boolean ) => void
}
const QrCode = ({ value, onCopy }: Props ) => {
  const firstRender = useRef(true);
  const [ qrCodeUrl, setQrCodeUrl ] = useState< string | null >(null);
  const downloadRef = useRef< HTMLAnchorElement >(null)
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const generate = useCallback(async () => {
    const url = await qrCodeGenerator( value, {
      color: {
        dark: theme.colors.dark[7],
        light: theme.colors.gray[3]
      }
    });
    url && setQrCodeUrl(url);
    firstRender.current = false
  }, [ theme, value ]);

  const onDownload = () => {
    downloadRef.current && downloadRef.current.click();
  }

  useEffect(() => {
    if ( typeof window === 'undefined' || firstRender.current === false ) return;
    generate();
    return () => {
      qrCodeUrl && URL.revokeObjectURL(qrCodeUrl)
    }
  }, [ qrCodeUrl, generate ])

  return (
    <Box className={ classes.contentWrapper }>
      {
        qrCodeUrl !== null ?
        <>
          <Box aria-label='download qr-code' onClick={ onDownload } className={ classes.imageWrapper }>
            <Image src={ qrCodeUrl } alt='loading'/>
            <Text className={ classes.text }>
              <Trans ns='qr-code' i18nKey='clickToDownload' />
            </Text>
          </Box>
        </> :
        <Center className={ classes.loader }>
          <Loader />
        </Center>
      }
      <a ref={ downloadRef } href={ qrCodeUrl !== null ? qrCodeUrl : '' } download='secure-file qr-code' hidden/>
    </Box>
  )
}

export default QrCode