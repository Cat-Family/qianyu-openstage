import React from 'react';
import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  Center,
  Stack,
  Flex,
  CloseButton,
  Switch,
  Avatar,
  ScrollArea,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandAlipay,
  IconBrandGoogle,
  IconBrandWeibo,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandWindows,
  IconBrandDiscord,
  IconBrandFacebook,
  IconSelector,
} from '@tabler/icons-react';
import classes from './Links.module.css';

const mockdata = [
  { title: 'Github', icon: IconBrandGithub },
  { title: 'Alipay', icon: IconBrandAlipay, color: '#4676fb' },
  { title: 'Google', icon: IconBrandGoogle, color: '#cc0000' },
  { title: 'Facebook', icon: IconBrandFacebook, color: '#1877f2' },
  { title: 'Discord', icon: IconBrandDiscord, color: '#404eed' },
  { title: 'Microsoft', icon: IconBrandWindows, color: '#0078d4' },
  { title: 'Instagram', icon: IconBrandInstagram, color: '#d62976 ' },
  { title: 'X', icon: IconBrandTwitter, color: '#00ACEE' },
  { title: 'Weibo', icon: IconBrandWeibo, color: '#DF2029' },
];

export default function Links() {
  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={item.color} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));
  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>添加账户至您的个人资料</Text>
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
            未经授权，此信息不会被本平台以外分享
          </Anchor>
        </Group>
        <ScrollArea h="27vh" type="never">
          <Center>
            <SimpleGrid
              w="75%"
              mt="md"
              cols={{ base: 1, sm: 3, lg: 4 }}
              spacing={{ base: 10, sm: 'md' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              {items}
            </SimpleGrid>
          </Center>
          <IconSelector style={{ position: 'sticky', bottom: '42%', left: '93%' }} />
        </ScrollArea>
      </Card>
      <Stack align="center" py="lg">
        <Card w="85%" withBorder radius="md" p={0} className={classes.card}>
          <Flex p="md" justify="space-between">
            <Group>
              <Avatar color="rgba(255, 255, 255, 1)">
                <IconBrandGithub color="rgba(0, 0, 0, 1)" />
              </Avatar>
              <Flex direction="column">
                <Text>用户名</Text>
                <Text>Github</Text>
              </Flex>
            </Group>
            <CloseButton />
          </Flex>
          <Stack p="md" className={classes.list}>
            <Flex justify="space-between" wrap="wrap">
              <Text>快捷登陆</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
            <Flex justify="space-between" wrap="wrap">
              <Text>公开资料</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
          </Stack>
        </Card>
        <Card w="85%" withBorder radius="md" p={0} className={classes.card}>
          <Flex p="md" justify="space-between">
            <Group>
              <Avatar color="rgba(255, 255, 255, 1)">
                <IconBrandAlipay color="#4676fb" />
              </Avatar>
              <Flex direction="column">
                <Text>用户名</Text>
                <Text>Alipay</Text>
              </Flex>
            </Group>
            <CloseButton />
          </Flex>
          <Stack p="md" className={classes.list}>
            <Flex justify="space-between" wrap="wrap">
              <Text>快捷登陆</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
            <Flex justify="space-between" wrap="wrap">
              <Text>公开资料</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
          </Stack>
        </Card>
        <Card w="85%" withBorder radius="md" p={0} className={classes.card}>
          <Flex p="md" justify="space-between">
            <Group>
              <Avatar color="rgba(255, 255, 255, 1)">
                <IconBrandGithub color="rgba(0, 0, 0, 1)" />
              </Avatar>
              <Flex direction="column">
                <Text>用户名</Text>
                <Text>Github</Text>
              </Flex>
            </Group>
            <CloseButton />
          </Flex>
          <Stack p="md" className={classes.list}>
            <Flex justify="space-between">
              <Text>快捷登陆</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
            <Flex justify="space-between">
              <Text>公开资料</Text>
              <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
