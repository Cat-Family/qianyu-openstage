import React from 'react';
import {
  Avatar,
  Button,
  CloseButton,
  Divider,
  Flex,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconDeviceDesktop,
  IconDeviceImac,
  IconDeviceIpad,
  IconDeviceMobile,
} from '@tabler/icons-react';
import classes from './Devices.module.css';

const Devices = () => (
  <>
    <Text className={classes.text}>
      以下是当前使用您的账号登录的所有设备。您可以单独注销每个设备或一次注销所有其他设备。
    </Text>
    <Space h="1rem" />
    <Text className={classes.text}>
      如果您发现不明登录记录，请注销该设备并立即更改您的账号密码。
    </Text>

    <Title order={3} className={classes.title} mt="lg">
      当前设备
    </Title>
    <Flex align="center" my="md">
      <Avatar size="lg" mr="lg">
        <IconDeviceMobile />
      </Avatar>

      <Flex direction="column">
        <Text className={classes.device}>Windows · chrome</Text>
        <Text className={classes.location}>Tokyo, Tokyo, Japan</Text>
      </Flex>

      <Space style={{ flex: 1 }} />
      <CloseButton />
    </Flex>
    <Divider mb="lg" />
    <Title order={3} className={classes.title}>
      其他设备
    </Title>
    <Stack my="md" gap="sm">
      <Flex align="center">
        <Avatar size="lg" mr="lg">
          <IconDeviceIpad />
        </Avatar>

        <Flex direction="column">
          <Text className={classes.device}>Ipad · chrome</Text>
          <Text className={classes.location}>
            Hong Kong, Central and Western District, Hong Kong · 2 天前
          </Text>
        </Flex>

        <Space style={{ flex: 1 }} />
        <CloseButton />
      </Flex>
      <Divider />
      <Flex align="center">
        <Avatar size="lg" mr="lg">
          <IconDeviceMobile />
        </Avatar>

        <Flex direction="column">
          <Text className={classes.device}>Android · chrome</Text>
          <Text className={classes.location}>
            Hong Kong, Central and Western District, Hong Kong · 2 天前
          </Text>
        </Flex>

        <Space style={{ flex: 1 }} />
        <CloseButton />
      </Flex>
      <Divider />
      <Flex align="center">
        <Avatar size="lg" mr="lg">
          <IconDeviceDesktop />
        </Avatar>

        <Flex direction="column">
          <Text className={classes.device}>Windows · firefox</Text>
          <Text className={classes.location}>
            Hong Kong, Central and Western District, Hong Kong · 4 天前
          </Text>
        </Flex>

        <Space style={{ flex: 1 }} />
        <CloseButton />
      </Flex>
      <Divider />
      <Flex align="center">
        <Avatar size="lg" mr="lg">
          <IconDeviceImac />
        </Avatar>

        <Flex direction="column">
          <Text className={classes.device}>Mac · chrome</Text>
          <Text className={classes.location}>HangZhou · 5 天前</Text>
        </Flex>

        <Space style={{ flex: 1 }} />
        <CloseButton />
      </Flex>
      <Divider />
      <Flex align="center">
        <Avatar size="lg" mr="lg">
          <IconDeviceDesktop />
        </Avatar>

        <Flex direction="column">
          <Text className={classes.device}>Linux · chrome</Text>
          <Text className={classes.location}>Hong Kong · 6 天前</Text>
        </Flex>

        <Space style={{ flex: 1 }} />
        <CloseButton />
      </Flex>
      <Divider />
    </Stack>

    <Title className={classes.title} mt="lg">
      注销已知所有设备
    </Title>
    <Text my="md" className={classes.text}>
      此后您在所有已注销设备上必须重新登录
    </Text>
    <Button variant="outline" className={classes.button} size="compact-md">
      注销所有已知设备
    </Button>
    <Space h="1rem" />
  </>
);

export default Devices;
