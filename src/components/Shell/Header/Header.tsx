import React, { useState } from 'react';
import cx from 'clsx';
import { AppShell, Box, Burger, Flex, Group, RemoveScroll, Title } from '@mantine/core';
import classes from './Header.module.css';
import { UserMenu } from '../../UserMenu';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  const [state, setState] = useState();
  return (
    <>
      <AppShell.Header
        display="flex"
        className={cx(classes.header, RemoveScroll.classNames.fullWidth)}
        data-desktop
      >
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Title size={21} fw={600}>
            千渝掌柜
          </Title>
        </Group>
        <Box style={{ flex: 1 }} />
        <Group h="100%" px="md">
          <UserMenu />
        </Group>
      </AppShell.Header>
    </>
  );
};

export default Header;
