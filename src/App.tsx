import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createEmotionCache,
  Global
} from '@mantine/core'
import { useState } from 'react'

import { AuthenticationForm } from './pages/Login'
import GithubOAuthPage from './pages/GithubOAuth'
import RequireAuth from './components/RequireAuth'
import UnauthorizedPage from './pages/UnauthorizedPage'
import CaretakersPage from './pages/Caretakers'
import stylisRTLPlugin from 'stylis-plugin-rtl'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { DirectionContext } from './components/Layout/DirectionContext'
import { Layout } from './components/Layout/Layout'
import StoresPage from './pages/stores/StoresPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import VersionPage from './pages/version/VersionPage'
import NoticePage from './pages/notice/NoticePage'

const THEME_KEY = 'mantine-color-scheme'

function App() {
  const rtlCache = createEmotionCache({
    key: 'mantine-rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin]
  })

  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: THEME_KEY,
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)')
      ? 'dark'
      : 'light',
    getInitialValueInEffect: true
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const toggleDirection = () =>
    setDir(current => (current === 'ltr' ? 'rtl' : 'ltr'))

  useHotkeys([
    ['mod + J', () => toggleColorScheme()],
    ['mod + shift + L', () => toggleDirection()]
  ])
  return (
    <DirectionContext.Provider value={{ dir, toggleDirection }}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            dir,
            colorScheme,
            headings: { fontFamily: 'system-ui' }
          }}
          emotionCache={dir === 'rtl' ? rtlCache : undefined}
        >
          <Global
            styles={theme => ({
              body: {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[1]
                    : theme.colors.gray[8]
              }
            })}
          />
          <div dir={dir}>
            <BrowserRouter>
              <Routes>
                <Route path="/users/login" element={<AuthenticationForm />} />
                <Route path="/oauth/github" element={<GithubOAuthPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                <Route element={<RequireAuth allowedRoles={[19999]} />}>
                  <Route element={<Layout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/caretakers" element={<CaretakersPage />} />
                    <Route path="/api" element={<h2>api</h2>} />
                    <Route
                      path="/system/messages"
                      element={<h2>system message</h2>}
                    />

                    <Route path="/versions" element={<VersionPage />} />
                    <Route path="/stores" element={<StoresPage />} />
                    <Route path="/notice" element={<NoticePage />} />
                    <Route path="/stores/menu" element={<h2>menu</h2>} />
                    <Route path="/customer" element={<h2>customer</h2>} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </MantineProvider>
      </ColorSchemeProvider>
    </DirectionContext.Provider>
  )
}

export default App
