import { ChangeEventHandler } from 'react';
import { Box, Progress, PasswordInput, Group, Text, Center, Button, Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IoCheckmark, IoClose, IoWarning } from 'react-icons/io5';

import useTranslation from '@/translation/useTranslation';;

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IoCheckmark size={14} /> : <IoClose size={14} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number', code: 'includesNumber' },
  { re: /[a-z]/, label: 'Includes lowercase letter', code: 'includesLowercaseLetter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter', code: 'includesUppercaseLetter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol', code: 'includesSpecialSymbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const PasswordInputElement = ({ value, setValue }:{ value: string, setValue: ( a: string ) => void }) => {
  const strength = getStrength(value);
  const { t } = useTranslation('setup');
  const { t: commonT } = useTranslation('common')

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={ t(requirement.code) } meets={requirement.re.test(value)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setValue(e.target.value)
  }

  return (
    <div>
      <PasswordInput
        value={value}
        onChange={ onChangeHandler }
        placeholder={ t("yourPassword") }
        label={ commonT("password") }
        required
      />

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label={ t("hasLeastCharacters") } meets={value.length > 5} />
      {checks}
    </div>
  )
}

function SetupPasswordInput({ submitPassword }:{ submitPassword: (a: string) => void }) {
  const [value, setValue] = useInputState('');
  const { t } = useTranslation('setup');
  const { t: commonT } = useTranslation('common')

  return (
    <>
      <Title order={3} my='md'>Password</Title>
      <Box sx={(theme) => ({ [theme.fn.largerThan('md')]: { maxWidth: '500px', margin: '0 auto' }})}>
        <Group p='md' mb='lg' sx={(theme) => ({ 
          borderRadius: theme.radius.md, border: `.1rem solid ${theme.colors.yellow[7]}`
        })}>
          <Group>
            <IoWarning style={{ fontSize: '1.5rem', color: '#fcc419' }} />
            <Title order={3} sx={(theme) => ({ color: theme.colors.yellow[5] })}>{ commonT('warning') }</Title>
          </Group>
          <Text color='gray'>
            { t('passwordForgat') }
          </Text>
        </Group>
        <PasswordInputElement value={ value } setValue={ setValue } />
        <Center pt='lg' sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={ getStrength(value) < 50 } onClick={ () => submitPassword(value) }>{ commonT('submit') }</Button>
        </Center>
      </Box>
    </>
  )
}

export default SetupPasswordInput