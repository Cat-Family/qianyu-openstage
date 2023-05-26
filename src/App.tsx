import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core'
import { useState } from 'react'

import { AuthenticationForm } from './pages/Login'
import GithubOAuthPage from './pages/GithubOAuth'
import RequireAuth from './components/RequireAuth'
import UnauthorizedPage from './pages/UnauthorizedPage'
import CaretakersPage from './pages/Caretakers'
import Layout from './components/Layout/Layout'

function App() {
  return (
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
            <Route path="/system/messages" element={<h2>system message</h2>} />

            <Route path="/versions" element={<h2>version</h2>} />
            <Route path="/stores" element={<h2>stores</h2>} />
            <Route path="/stores/messages" element={<h2>stores messages</h2>} />
            <Route path="/stores/menu" element={<h2>menu</h2>} />
            <Route path="/customer" element={<h2>customer</h2>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
