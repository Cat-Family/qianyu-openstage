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
  return (
    <>
      <AppShell.Header className={cx(classes.header, RemoveScroll.classNames.fullWidth)}>
        <Group gap="sm">
          <Burger size="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          <Image src="/public/logo.png" radius="sm" h={36} aria-label="Qianyu openstage logo" />
        </Group>
        <Box style={{ flex: 1 }} />
        <UserMenu />
      </AppShell.Header>
    </>
  );
};

export default Header;
