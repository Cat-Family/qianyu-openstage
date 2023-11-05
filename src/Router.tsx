import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Shell } from './components/Shell/Shell';
import { Authentication } from './pages/Authentication/Authentication.page';
import Oauth from './pages/Oauth/Oauth.page';
import TablePage from './pages/Table/Table.page';
import RequireAuth from './components/RequireAuth/RequireAuth';
import { NotFound } from './pages/NotFound/NotFound.page';

export function Router() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/users/auth" element={<Authentication />} />
      <Route path="/users/oauth" element={<Oauth />} />
      <Route path="/unauthorized" element={<Box>unauthorized</Box>} />

      {/* store front routes */}
      <Route path="/" element={<Shell />}>
        <Route element={<RequireAuth allowedRoles={['1719573728377450498']} />}>
          <Route index element={<TablePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['1719575552065024002']} />}>
          <Route path="/resources/menuResource" element={<Box>menuResource</Box>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['1719578100662546434']} />}>
          <Route path="/resources/linkResource" element={<Box>linkResource</Box>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['1719579906985701377']} />}>
          <Route path="/resources/URLResource" element={<Box>URLResource</Box>} />
        </Route>
      </Route>

      {/* catch call */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
