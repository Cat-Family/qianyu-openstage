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
        <Route element={<RequireAuth allowedRoles={[29999]} />}>
          <Route
            index
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <TablePage />
              </React.Suspense>
            }
          />
        </Route>
      </Route>

      {/* catch call */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
