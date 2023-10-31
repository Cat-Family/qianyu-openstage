import React, { useState } from 'react';
import {
  ActionIcon,
  Box,
  Container,
  Divider,
  ScrollArea,
  Space,
  Tabs,
  Text,
  rem,
} from '@mantine/core';
import {
  IconBrush,
  IconDevicesCog,
  IconKeyboard,
  IconLanguage,
  IconLinkPlus,
  IconShieldLock,
  IconSquareRoundedX,
  IconUserEdit,
} from '@tabler/icons-react';
import { ContextModalProps } from '@mantine/modals';
import Profile from './panel/Profile/Profile';
import Security from './panel/Security';
import Links from './panel/Links/Links';
import { SettingsTabsEnum } from '@/ts/types/enums/settingsTabs.enum';
import { TabsDataType } from '@/ts/types/types/tabsData.type';
import classes from './Settings.module.css';

const Settings = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState<SettingsTabsEnum>('profile');

  const tabs: TabsDataType = [
    { group: true, title: '用户设置' },
    {
      title: '个人资料',
      value: 'profile',
      icon: <IconUserEdit style={iconStyle} />,
      element: <Profile />,
    },
    {
      title: '账户安全',
      value: 'security',
      icon: <IconShieldLock style={iconStyle} />,
      element: <Security />,
    },
    {
      title: '我的设备',
      value: 'devices',
      icon: <IconDevicesCog style={iconStyle} />,
    },
    {
      title: '连接',
      value: 'links',
      icon: <IconLinkPlus style={iconStyle} />,
      element: <Links />,
    },
    { group: true, title: 'App设置' },
    { title: '外观', value: 'appearance', icon: <IconBrush style={iconStyle} /> },
    { title: '快捷键', value: 'shortcut', icon: <IconKeyboard style={iconStyle} /> },
    { title: '语言', value: 'i18', icon: <IconLanguage style={iconStyle} /> },
  ];

  return (
    <Container size="md" px="lg" pos="relative">
      <Tabs
        variant="outline"
        className={classes.root}
        orientation="vertical"
        radius="lg"
        value={activeTab}
        onChange={(e) => setActiveTab(e as SettingsTabsEnum)}
      >
        <Tabs.List aria-label="Settings menu" className={classes.list}>
          <ScrollArea h="100vh" p={0} type="never">
            {tabs.map((item, index) =>
              item.group ? (
                index === 0 ? (
                  <Text key={index} className={classes.groupTitleText}>
                    {item.title}
                  </Text>
                ) : (
                  <Box key={index}>
                    <Divider my="xs" />
                    <Text className={classes.groupTitleText}>{item.title}</Text>
                  </Box>
                )
              ) : (
                <Tabs.Tab
                  w="100%"
                  key={item.value}
                  value={item.value as string}
                  leftSection={item.icon}
                >
                  {item.title}
                </Tabs.Tab>
              )
            )}
          </ScrollArea>
        </Tabs.List>
        {tabs.map(
          (item) =>
            !item.group && (
              <Tabs.Panel
                key={`${item.value}Panel`}
                className={classes.panel}
                value={item.value as string}
              >
                <ScrollArea h="calc(100vh - 1rem)" pl={6} offsetScrollbars scrollbarSize={3}>
                  <Space h="xs" />
                  {item.element}
                </ScrollArea>
              </Tabs.Panel>
            )
        )}
      </Tabs>
      <ActionIcon
        variant="transparent"
        aria-label="Close settings modal"
        className={classes.closeBtn}
        onClick={() => context.closeContextModal(id)}
      >
        <IconSquareRoundedX />
        <Text fz="16px" fw={600}>
          ESC
        </Text>
      </ActionIcon>
    </Container>
  );
};

export default Settings;
