import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';
import { useOutlet } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import classes from './Shell.module.css';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const currentOutlet = useOutlet();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar />
      <AppShell.Main
        className={classes.main}
        pt="var(--app-shell-header-offset, 0px)"
        pr="var(--app-shell-aside-offset, 0px)"
        pb="var(--app-shell-footer-offset, 0px)"
        pl="var(--app-shell-navbar-offset, 0px)"
      >
        <div className={classes.content}>{currentOutlet}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
