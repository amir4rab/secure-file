import { FormEventHandler, useState } from 'react';
import { useForm } from '@mantine/form';
import useAuth from '@/hooks/useAuth';

import { IoEye, IoEyeOff, IoInformation } from 'react-icons/io5'
import { Title, Text, Button, Group, Box, PasswordInput, LoadingOverlay, Center, createStyles } from '@mantine/core';
import Link from '@/components/link';
import { useRouter } from 'next/router';
import useTranslation from '@/translation/useTranslation';;
import Trans from '@/translation/Trans';

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: '80vh',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    minWidth: '100%',
    [ theme.fn.largerThan('md') ] : {
      minWidth: '60vh',
      background: theme.colors.dark[6],
      borderRadius: theme.radius.md,
      padding: `${ theme.spacing.xl * 2 }px ${ theme.spacing.xl * 3 }px`
    }
  },
  title: {
    fontSize: theme.fontSizes.xl * 2,
    paddingBottom: theme.spacing.xl,
    minWidth: '40%'
  },
  box: {
    minWidth: '40%'
  },
}));

const Login = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const { authenticate, verifyPassword } = useAuth();
  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (value) => ( value.length > 5 ? null : t('shortPassword') )
    },
  });

  const { classes } = useStyles();
  const { t } = useTranslation('login');
  const { t: commonT } = useTranslation('common')

  const submitEvent: FormEventHandler = form.onSubmit( async ({ password }) => {
    const isPasswordValid = await verifyPassword(password);
    if (!isPasswordValid) {
      form.setErrors({ password: t('falsePassword')  })
      return;
    };

    setIsLoading(true)

    await authenticate(password);
    router.push('/app')
  })

  return (
    <Center className={ classes.main }>
      <div className={ classes.wrapper }>

        <Title data-testid='loginTitle' className={ classes.title } order={1}>
          { t('login') }
        </Title>
        <Box className={ classes.box }>
          <form onSubmit={ submitEvent }>
            <PasswordInput
              required
              label={ commonT('password') }
              placeholder={ t('someRandomStrings') }
              description={ 
                <Trans
                  ns='login'
                  i18nKey='forgatPassword'
                  components={[
                    <Text key={0} size='xs' />,
                    <Link key={1} size='xs' path='/reset' />
                  ]}
                />
              }
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IoEyeOff style={{ fontSize: `${size}px` }} /> : <IoEye style={{ fontSize: `${size}px` }} />
              }
              {...form.getInputProps('password')}
            />
            <Group position="right" mt="md">
              <Button data-testid='loginButton' type="submit">{ commonT('login') }</Button>
            </Group>
          </form>
        </Box>
      </div>
      <LoadingOverlay visible={ isLoading } />
    </Center>
  )
}

export default Login