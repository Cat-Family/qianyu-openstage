import '@mantine/core/styles.css';
import { DirectionProvider, MantineProvider, ScrollArea } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { Search } from './components/Search';
import { HotKeysHandler } from './components/HotKeysHandler';
import { ModalsProvider } from '@mantine/modals';
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
