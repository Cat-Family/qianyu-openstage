import React from 'react';
import { ActionIcon, Badge, Group, rem } from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { ResourceInterface } from '../../ts/types/interface/menu.res.interface';

const renderGrayBadge = (text: string) => (
  <Badge w="100%" size="md" radius="sm" color="rgb(180, 180, 180)">
    {text}
  </Badge>
);

const renderAddBtn = (item: ResourceInterface) => {
  if (item.resourceType === 'C') {
    return (
      <ActionIcon
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
    );
  }

  if (item.resourceType === 'R' && item.parentId !== '0') {
    return (
      <ActionIcon
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
    );
  }

  return null;
};

const renderActions = (item: ResourceInterface) => (
  <Group wrap="nowrap">
    <ActionIcon
      variant="subtle"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
    <ActionIcon
      variant="subtle"
      color="red"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
    {renderAddBtn(item)}
  </Group>
);

export { renderActions, renderGrayBadge };
