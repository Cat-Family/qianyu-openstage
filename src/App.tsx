import React from 'react';
import { Box, DirectionProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsModal from './context/SettingsModalContext';
import { HotKeysHandler } from './components/HotKeysHandler';
import { Search } from './components/Search';
import { theme } from './theme';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/dropzone/styles.css';
import { Authentication } from './pages/Authentication/Authentication.page';
import Oauth from './pages/Oauth/Oauth.page';
import { Shell } from './components/Shell/Shell';
import RequireAuth from './components/RequireAuth/RequireAuth';
import TablePage from './pages/Table/Table.page';
import { Router } from './Router';

export default function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <DirectionProvider initialDirection="ltr" detectDirection={false}>
          <MantineProvider theme={theme}>
            <ModalsProvider modals={{ settings: SettingsModal }}>
              <Search />
              <Notifications />
              <HotKeysHandler />
              <Router />
            </ModalsProvider>
          </MantineProvider>
        </DirectionProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}
