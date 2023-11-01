import React from 'react';
import {
  Button,
  Divider,
  Stack,
  Text,
  Title,
  Box,
  Progress,
  PasswordInput,
  Group,
  Center,
  Card,
  Flex,
  Badge,
  CloseButton,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import {
  IconCheck,
  IconDeviceMobile,
  IconKey,
  IconMessage,
  IconShieldLock,
  IconX,
} from '@tabler/icons-react';
import classes from './Security.module.css';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="xs">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
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

const data = [
  {
    icon: IconDeviceMobile,
    title: 'Authenticator app',
    description:
      'Use an authentication app or browser extension to get two-factor authentication codes when prompted.',
    isOpen: true,
  },
  {
    icon: IconMessage,
    title: 'SMS/Text message',
    description:
      'Get one-time codes sent to your phone via SMS to complete authentication requests.',
    isOpen: false,
  },
  {
    icon: IconShieldLock,
    title: 'Security keys',
    description:
      'Security keys are hardware devices that can be used as your second factor of authentication.',
    isOpen: false,
  },
];

const Security = () => {
  const [value, setValue] = useInputState('');
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const items = data.map((item) => (
    <Group justify="space-between" className={classes.item} wrap="nowrap" gap="md" key={item.title}>
      <Flex gap="sm" className={classes.flex}>
        <item.icon style={{ alignSelf: 'start', width: '20px' }} />
        <div>
          <Flex align="center" gap="xs" wrap="wrap">
            <Text>{item.title}</Text>
            {item.isOpen && (
              <Badge variant="outline" color="teal">
                Configured
              </Badge>
            )}
          </Flex>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Flex>
      {item.isOpen ? (
        <Button style={{ alignSelf: 'start' }} size="xs" variant="outline">
          Edit
        </Button>
      ) : (
        <Button style={{ alignSelf: 'start' }} size="xs" variant="outline">
          Add
        </Button>
      )}
    </Group>
  ));

  return (
    <Stack>
      <Title order={3} className={classes.title}>
        Change password
      </Title>
      <Divider />
      <PasswordInput size="xs" label="Old password" placeholder="Your password" required />
      <PasswordInput
        size="xs"
        value={value}
        onChange={setValue}
        placeholder="Your password"
        label="New password"
        required
      />

      <PasswordInput size="xs" placeholder="Your password" label="Confirm new password" required />
      <Box>
        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>

        <PasswordRequirement label="Has at least 6 characters" meets={value.length > 5} />
        {checks}
      </Box>

      <Button variant="outline">Update password</Button>

      <Flex justify="space-between" align="center">
        <Title className={classes.title} order={3}>
          Two-Step Verification
        </Title>

        <CloseButton size="sm" />
      </Flex>
      <Divider />

      <Card withBorder radius="md" p="md" className={classes.card}>
        <Text fz="xs" c="dimmed" mt={3} mb="xl">
          Two-factor authentication adds an additional layer of security to your account by
          requiring more than just a password to sign in. Learn more about two-factor
          authentication.
        </Text>
        {items}
        <Divider my="md" />
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="md">
          <Flex gap="sm" className={classes.flex}>
            <IconKey style={{ alignSelf: 'start', width: '27px' }} />
            <div>
              <Flex align="center" gap="xs" wrap="wrap">
                <Text>Recovery codes</Text>
                <Badge variant="outline" color="teal">
                  Viewed
                </Badge>
              </Flex>
              <Text size="xs" c="dimmed">
                Recovery codes can be used to access your account in the event you lose access to
                your device and cannot receive two-factor authentication codes.
              </Text>
            </div>
          </Flex>
          <Button size="xs" style={{ alignSelf: 'start' }} variant="outline">
            View
          </Button>
        </Group>
      </Card>
    </Stack>
  );
};

export default Security;
