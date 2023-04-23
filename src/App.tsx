import { Route, Routes } from 'react-router-dom'
import Layout from './app/Layout'
import { BrowserRouter } from 'react-router-dom'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core'
import { useState } from 'react'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch
} from '@tabler/icons-react'

const actions: SpotlightAction[] = [
  {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
    icon: <IconHome size="1.2rem" />
  },
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
    icon: <IconDashboard size="1.2rem" />
  },
  {
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
    icon: <IconFileText size="1.2rem" />
  }
]

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SpotlightProvider
          transitionProps={{ duration: 300, transition: 'slide-down' }}
          actions={actions}
          searchIcon={<IconSearch size="1.2rem" />}
          searchPlaceholder="Search..."
          shortcut={['mod + P', 'mod + K', '/']}
          nothingFoundMessage="Nothing found..."
        >
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<h2>Dashboard</h2>} />
                <Route path="/caretakers" element={<h2>caretakers</h2>} />
                <Route path="/api" element={<h2>api</h2>} />

                <Route
                  path="/system/messages"
                  element={<h2>system message</h2>}
                />

                <Route path="/versions" element={<h2>version</h2>} />
                <Route path="/stores" element={<h2>stores</h2>} />
                <Route
                  path="/stores/messages"
                  element={<h2>stores messages</h2>}
                />

                <Route path="/stores/menu" element={<h2>menu</h2>} />

                <Route path="/customer" element={<h2>customer</h2>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
