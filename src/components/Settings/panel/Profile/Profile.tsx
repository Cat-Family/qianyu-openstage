import React, { useRef } from 'react';
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
  useMantineTheme,
  Box,
  Title,
  FocusTrap,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX, IconAt, IconDownload, IconCloudUpload } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './Profile.module.css';

export default function Profile() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [userNameOpened, { open: userNameOpen, close: userNameClose }] = useDisclosure(false);
  const [active, { toggle }] = useDisclosure(false);
  const profileList = [
    { title: '用户名', label: 'admin', handler: userNameOpen },
    { title: '电子邮件', label: 'is.lin.liu@outlook.com', handler: toggle },
    { title: '手机号', label: '15696665345' },
  ];

  return (
    <Stack w="100%">
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
      </Card>

      <Title order={3}>Email</Title>
      <Flex className={classes.email} gap="lg">
        <FocusTrap active={active}>
          <TextInput
            miw={120}
            type="email"
            leftSection={<IconAt size={16} />}
            style={{ flex: 1 }}
            label="添加电子邮件"
          />
        </FocusTrap>
        <Button style={{ alignSelf: 'end' }} w={80}>
          Add
        </Button>
      </Flex>
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
        <div className={classes.wrapper}>
          <Dropzone
            openRef={openRef}
            onDrop={() => {}}
            className={classes.dropzone}
            radius="md"
            accept={IMAGE_MIME_TYPE}
            maxSize={30 * 1024 ** 2}
          >
            <Box style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                <Dropzone.Idle>Upload Avatar</Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                Drag&apos;n&apos;drop files here to upload. We can accept img files that are less
                than 3mb in size.
              </Text>
            </Box>
          </Dropzone>

          <Button
            className={classes.control}
            size="md"
            radius="xl"
            onClick={() => openRef.current?.()}
          >
            Select files
          </Button>
        </div>
      </Modal>

      <Modal
        title="修改用户名"
        opened={userNameOpened}
        onClose={userNameClose}
        closeOnClickOutside={false}
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
    </Stack>
  );
}
