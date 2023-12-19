import React from 'react';
import { rem } from '@mantine/core';
import { IconCategory2, IconDashboard } from '@tabler/icons-react';

export const IconMap = {
  IconDashboard: <IconDashboard style={{ width: rem(18), height: rem(18) }} />,
  IconCategory2: <IconCategory2 style={{ width: rem(18), height: rem(18) }} />,
};

export type IconMapKey = keyof typeof IconMap;
