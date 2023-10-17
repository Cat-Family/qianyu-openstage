import {
  Box,
  Container,
  Divider,
  Flex,
  Modal,
  ScrollArea,
  Space,
  Tabs,
  Text,
  UnstyledButton
} from '@mantine/core'
import { FC } from 'react'

interface ISettingsModal {
  settingsOpened: boolean
  settingsClose: () => void
}

const SettingsModal: FC<ISettingsModal> = ({
  settingsOpened,
  settingsClose
}) => {
  return (
    <Modal
      opened={settingsOpened}
      onClose={settingsClose}
      fullScreen
      withCloseButton={false}
      transitionProps={{ transition: 'fade', duration: 200 }}
      padding={0}
    >
      <Container size="md" px="xs" display="flex">
        <Tabs
          sx={{ flex: 1 }}
          mih="100vh"
          defaultValue="gallery"
          orientation="vertical"
        >
          <Tabs.List>
            <ScrollArea h="100vh" type="never">
              <Space h={18} />
              <Text fz="12px">用户设置</Text>
              <Tabs.Tab w="100%" value="gallery">
                我的账号
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="messages">
                个人资料
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="settings">
                隐私与安全
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="a">
                设备
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="b">
                连接
              </Tabs.Tab>
              <Divider my="sm" />
              <Text fz="xs">APP设置</Text>
              <Tabs.Tab w="100%" value="c">
                外观
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="c">
                通知
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="c">
                快捷键
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="d">
                语言
              </Tabs.Tab>
              <Tabs.Tab w="100%" value="e">
                高级设置
              </Tabs.Tab>
              <Divider my="sm" />
              <Tabs.Tab w="100%" value="f">
                登出
              </Tabs.Tab>
              <Divider my="sm" />
              <Text fz={10}>Dev 0.0.1 (6822a8c)</Text>
              <Text fz={10}>Windows 10 64-Bit</Text>
            </ScrollArea>
          </Tabs.List>

          <Tabs.Panel
            value="gallery"
            sx={{ paddingTop: '1vh', paddingInline: '1rem' }}
          >
            <ScrollArea h="99vh" type="never" offsetScrollbars>
              <Box sx={{ backgroundColor: 'red', height: '100vh' }}></Box>
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
          <Tabs.Panel value="a">Settings</Tabs.Panel>
          <Tabs.Panel value="b">Settings</Tabs.Panel>
          <Tabs.Panel value="c">Settings</Tabs.Panel>
          <Tabs.Panel value="d">Settings</Tabs.Panel>
          <Tabs.Panel value="e">Settings</Tabs.Panel>
          <Tabs.Panel value="f">Settings</Tabs.Panel>
          <Tabs.Panel value="g">Settings</Tabs.Panel>
          <Tabs.Panel value="h">Settings</Tabs.Panel>
          <Tabs.Panel value="i">Settings</Tabs.Panel>
          <Tabs.Panel value="j">Settings</Tabs.Panel>
          <Tabs.Panel value="k">Settings</Tabs.Panel>
          <Tabs.Panel value="l">Settings</Tabs.Panel>
          <Tabs.Panel value="m">Settings</Tabs.Panel>
          <Tabs.Panel value="n">Settings</Tabs.Panel>
          <Tabs.Panel value="o">Settings</Tabs.Panel>
          <Tabs.Panel value="p">Settings</Tabs.Panel>
          <Tabs.Panel value="q">Settings</Tabs.Panel>
          <Tabs.Panel value="r">Settings</Tabs.Panel>
          <Tabs.Panel value="s">Settings</Tabs.Panel>
          <Tabs.Panel value="t">Settings</Tabs.Panel>
          <Tabs.Panel value="u">Settings</Tabs.Panel>
          <Tabs.Panel value="v">Settings</Tabs.Panel>
        </Tabs>
        <UnstyledButton
          onClick={close}
          h={57}
          w={36}
          aria-label="关闭"
          sx={{ textAlign: 'center', color: '#4E5058', marginTop: 12 }}
        >
          <Flex
            justify="center"
            align="center"
            color="dimmed"
            sx={{
              borderColor: '#4E5058',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '50%',
              width: '36px',
              height: '36px'
            }}
          >
            <svg
              aria-hidden="true"
              role="img"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </Flex>

          <Text size="xs">ESC</Text>
        </UnstyledButton>
      </Container>
    </Modal>
  )
}

export default SettingsModal
