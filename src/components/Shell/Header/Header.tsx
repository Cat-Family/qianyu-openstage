import React, { useState } from 'react';
import cx from 'clsx';
import { AppShell, Box, Burger, Group, Image, RemoveScroll } from '@mantine/core';
import { UserMenu } from '../../UserMenu';
import classes from './Header.module.css';

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
        <Group h="100%">
          <Burger size="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          <Image src="/logo.png" radius="sm" h={36} aria-label="Qianyu openstage logo" />
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
