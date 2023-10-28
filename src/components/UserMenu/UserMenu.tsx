import React from 'react';
import { Menu, Group, Text, Avatar, useMantineTheme, rem } from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronRight,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { openContextModal } from '@mantine/modals';

export function UserMenu() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <Avatar style={{ cursor: 'pointer' }} color="cyan" radius="xl">
            NE
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            <Group>
              <Avatar
                radius="xl"
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              />

              <div>
                <Text fw={500}>Nancy Eggshacker</Text>
                <Text size="xs" c="dimmed">
                  neggshaker@mantine.dev
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={() =>
              openContextModal({
                modal: 'settings',
                withCloseButton: false,
                fullScreen: true,
                keepMounted: true,
                padding: 0,
                innerProps: {},
              })
            }
          >
            Settings
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Change account
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={() => navigate('/users/login')}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
