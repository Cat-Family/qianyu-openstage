import React, { ReactElement } from 'react';
import { ActionIcon, Box, Group, StyleProp, ThemeIcon, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { IconMap, IconMapKey } from '../../utils/icon';
import { ResourceInterface, ResourceTable } from '../../ts/types/interface/menu.res.interface';

const columns: {
  name: string;
  uid: keyof ResourceTable;
  sortable?: boolean;
  searchable?: boolean;
  defaultShow?: boolean;
  w?: StyleProp<React.CSSProperties['width']> | undefined;
  render?: (item: ResourceInterface) => ReactElement | void;
}[] = [
  {
    name: 'ID',
    uid: 'resourceId',
    sortable: true,
    searchable: true,
    w: 180,
    defaultShow: true,
  },
  {
    name: 'Name',
    uid: 'resourceName',
    sortable: true,
    searchable: true,
    defaultShow: true,
    w: 150,
    render: (item) => (
      <Box style={{ display: 'flex', alignItems: 'center' }} w="100%">
        {item.resourceIcon && (
          <ThemeIcon variant="light" size={30}>
            {IconMap[item.resourceIcon as IconMapKey]}
          </ThemeIcon>
        )}
        <Box ml="md">{item.resourceName}</Box>
      </Box>
    ),
  },
  {
    name: 'ACTIONS',
    uid: 'actions',
    sortable: false,
    searchable: false,
    defaultShow: true,
    w: 100,
    render: (_item: ResourceInterface) => (
      <Group wrap="nowrap">
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      </Group>
    ),
  },
];

export default columns;
