import React from 'react';
import { IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { Spotlight, createSpotlight, SpotlightActionData } from '@mantine/spotlight';

export const [searchStore, searchHandlers] = createSpotlight();

export function Search() {
  const actions: SpotlightActionData[] = [
    {
      id: 'home',
      label: 'Home',
      description: 'Get to home page',
      leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Get full information about current system status',
      leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
      id: 'documentation',
      label: 'Documentation',
      description: 'Visit documentation to lean more about all features',
      leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
  ];

  return (
    <Spotlight
      store={searchStore}
      shortcut={['mod + K', 'mod + P']}
      actions={actions}
      tagsToIgnore={[]}
      highlightQuery
      clearQueryOnClose
      radius="md"
      limit={7}
      nothingFound="Nothing found..."
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} />,
        placeholder: 'Search documentation...',
      }}
    />
  );
}
