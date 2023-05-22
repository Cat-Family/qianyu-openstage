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

import { AuthenticationForm } from './pages/Login'
import GithubOAuthPage from './pages/GithubOAuth'
import RequireAuth from './components/RequireAuth'
import UnauthorizedPage from './pages/UnauthorizedPage'
import CaretakersPage from './pages/Caretakers'
import { Notifications } from '@mantine/notifications'

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
      <MantineProvider theme={{ colorScheme }}>
        <SpotlightProvider
          transitionProps={{ duration: 300, transition: 'slide-down' }}
          actions={actions}
          searchIcon={<IconSearch size="1.2rem" />}
          searchPlaceholder="Search..."
          shortcut={['mod + P', 'mod + K', '/']}
          nothingFoundMessage="Nothing found..."
        >
          <Notifications position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/users/login" element={<AuthenticationForm />} />
              <Route path="/oauth/github" element={<GithubOAuthPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route element={<RequireAuth allowedRoles={[19999]} />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<h2>Dashboard</h2>} />
                  <Route path="/caretakers" element={<CaretakersPage />} />
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
              </Route>
            </Routes>
          </BrowserRouter>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
