import { useState } from 'react';
import { Box, CloseButton, Divider, Tabs, Text, rem } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { ContextModalProps } from '@mantine/modals';
import Profile from './panel/Profile';
import Security from './panel/Security';
import { SettingsTabsEnum } from '@/ts/types/enums/settingsTabs.enum';
import { TabsDataType } from '@/ts/types/types/tabsData.type';
import classes from './Settings.module.css';

const Settings = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState<SettingsTabsEnum>('profile');

  let tabs: TabsDataType = [
    { group: true, title: '用户设置' },
    {
      title: '个人资料',
      value: 'profile',
      icon: <IconPhoto style={iconStyle} />,
      element: <Profile />,
    },
    {
      title: '账户安全',
      value: 'security',
      icon: <IconPhoto style={iconStyle} />,
      element: <Security />,
    },
    { title: '我的设备', value: 'devices', icon: <IconPhoto style={iconStyle} /> },
    { title: '连接', value: 'links', icon: <IconPhoto style={iconStyle} /> },
    { group: true, title: 'App设置' },
    { title: '外观', value: 'appearance', icon: <IconPhoto style={iconStyle} /> },
    { title: '快捷键', value: 'shortcut', icon: <IconPhoto style={iconStyle} /> },
    { title: '语言', value: 'i18', icon: <IconPhoto style={iconStyle} /> },
  ];

  return (
    <>
      <Tabs
        variant="outline"
        className={classes.root}
        orientation="vertical"
        radius="lg"
        value={activeTab}
        onChange={(e) => setActiveTab(e as SettingsTabsEnum)}
      >
        <Tabs.List aria-label="Settings menu" className={classes.list}>
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
              <Tabs.Tab key={item.value} value={item.value as string} leftSection={item.icon}>
                {item.title}
              </Tabs.Tab>
            )
          )}
        </Tabs.List>
        {tabs.map(
          (item) =>
            !item.group && (
              <Tabs.Panel
                key={`${item.value}Panel`}
                className={classes.panel}
                value={item.value as string}
              >
                {item.element}
              </Tabs.Panel>
            )
        )}
      </Tabs>
      <CloseButton
        aria-label="Close settings modal"
        className={classes.closeBtn}
        onClick={() => context.closeContextModal(id)}
      />
    </>
  );
};

export default Settings;
