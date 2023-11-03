import React from 'react';
import { Menu, Group, Text, Avatar, useMantineTheme, rem } from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronRight,
  IconSearch,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { openContextModal } from '@mantine/modals';
import { searchHandlers } from '../Search';
import useCookie from '../../hooks/useCookie';

export function UserMenu() {
  const navigate = useNavigate();
  const [value, updateCookie, deleteCookie] = useCookie('qy');

  return (
    <Menu
      withArrow
      width={265}
      position="bottom"
      transitionProps={{ transition: 'scale-y' }}
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

        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={() =>
            openContextModal({
              modal: 'settings',
              withCloseButton: false,
              fullScreen: true,
              keepMounted: true,
              padding: 0,
              zIndex: 300,
              closeOnEscape: false,
              innerProps: {},
            })
          }
        >
          Settings
        </Menu.Item>
        <Menu.Item
          onClick={searchHandlers.open}
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Authentication</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={() => {
            deleteCookie();
            navigate('/users/login');
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
