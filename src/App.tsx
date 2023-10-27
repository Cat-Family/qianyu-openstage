import React from 'react';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Router } from './Router';
import { HotKeysHandler } from './components/HotKeysHandler';
import { Search } from './components/Search';
import { theme } from './theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

export default function App() {
  return (
    <DirectionProvider initialDirection="ltr" detectDirection={false}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Search />
          <Notifications />
          <HotKeysHandler />
          <Router />
        </ModalsProvider>
      </MantineProvider>
    </DirectionProvider>
  );
}
