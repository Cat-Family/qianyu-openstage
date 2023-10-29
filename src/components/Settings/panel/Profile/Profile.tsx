import {
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Flex,
  Stack,
  Modal,
  rem,
  TextInput,
  Stepper,
} from '@mantine/core';
import classes from './Profile.module.css';
import { useDisclosure, useInputState, useListState } from '@mantine/hooks';
import { IconUpload, IconPhoto, IconX, IconUserCircle, IconAt } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

export default function Profile() {
  const [opened, { open, close }] = useDisclosure(false);
  const [userNameOpened, { open: userNameOpen, close: userNameClose }] = useDisclosure(false);
  const [emailOpened, { open: emailOpen, close: emailClose }] = useDisclosure(false);
  const profileList = [
    { title: '用户名', label: 'admin', handler: userNameOpen },
    { title: '电子邮件', label: 'is.lin.liu@outlook.com', handler: emailOpen },
    { title: '手机号', label: '15696665345' },
  ];

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
        onClick={open}
      />
      <Stack>
        {profileList.map((item, index) => (
          <Group key={index} justify="space-between" align="center">
            <Flex direction="column">
              <TextInput readOnly label={item.title} variant="unstyled" value={item.label} />
            </Flex>
            <Button type="button" variant="outline" size="xs" onClick={item.handler}>
              编辑
            </Button>
          </Group>
        ))}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        zIndex={400}
        size={500}
        radius="lg"
        yOffset={225}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Dropzone
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconUserCircle
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to upload avatar
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Modal>

      <Modal
        title="修改用户名"
        opened={userNameOpened}
        onClose={userNameClose}
        closeOnClickOutside={false}
        closeOnEscape={false}
        zIndex={400}
        radius="lg"
        yOffset={225}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          <TextInput label="新用户名" />
          <Button w={80} style={{ alignSelf: 'end' }} onClick={userNameClose}>
            确认
          </Button>
        </Stack>
      </Modal>

      <Modal
        title="修改邮箱"
        closeOnEscape={false}
        closeOnClickOutside={false}
        opened={emailOpened}
        onClose={() => {
          emailClose();
          setTimeout(() => {
            setActive(0);
          }, 1000);
        }}
        zIndex={400}
        size="lg"
        radius="lg"
        yOffset={225}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack p="lg">
          <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
            <Stepper.Step label="第一步" description="验证邮箱">
              <Stack gap="xs">
                <Group align="center" justify="space-between">
                  <TextInput
                    leftSection={<IconAt size={16} />}
                    style={{ flex: 1 }}
                    label="完整邮箱"
                  />
                  <Button variant="outline" w={120} style={{ alignSelf: 'end' }}>
                    发送验证码
                  </Button>
                </Group>
                <Group>
                  <TextInput style={{ flex: 1 }} label="验证码" />
                  <Button variant="outline" w={120} style={{ alignSelf: 'end' }}>
                    验证
                  </Button>
                </Group>
              </Stack>
            </Stepper.Step>
            <Stepper.Step label="第二步" description="添加新邮箱">
              <Stack gap="xs">
                <Group align="center" justify="space-between">
                  <TextInput
                    leftSection={<IconAt size={16} />}
                    style={{ flex: 1 }}
                    label="新邮箱"
                  />
                  <Button variant="outline" w={120} style={{ alignSelf: 'end' }}>
                    发送验证码
                  </Button>
                </Group>
                <Group>
                  <TextInput style={{ flex: 1 }} label="验证码" />
                  <Button variant="outline" w={120} style={{ alignSelf: 'end' }}>
                    验证
                  </Button>
                </Group>
              </Stack>
            </Stepper.Step>

            <Stepper.Completed>
              <Text p="lg" ta="center">
                邮箱更改成功
              </Text>
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            {active < 2 ? (
              <>
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  emailClose();
                  setTimeout(() => {
                    setActive(0);
                  }, 1000);
                }}
              >
                修改成功
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
}
