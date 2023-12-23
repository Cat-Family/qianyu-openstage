import React from 'react';
import { ActionIcon, Badge, Center, Group, Menu, MenuItem, Tooltip, rem } from '@mantine/core';

import { IconBan, IconDotsVertical, IconPencil, IconPlus, IconQuestionMark, IconTrash } from '@tabler/icons-react';
import { ResourceInterface } from '../../ts/types/interface/menu.res.interface';

const renderBanGrayBadge = (message: string) => (
  <Tooltip label={message}>
    <Badge style={{ cursor: 'help' }} size="sm" radius="sm" color="gray" variant="light">
      <Center>
        <IconBan width={14} height={14} />
      </Center>
    </Badge>
  </Tooltip>
);

const renderNoneGrayBadge = (message: string) => (
  <Tooltip label={message}>
    <Badge style={{ cursor: 'help' }} size="sm" radius="sm" color="gray" variant="light">
      <Center>
        <IconQuestionMark width={14} height={14} />
      </Center>
    </Badge>
  </Tooltip>
);

const renderAddBtn = (item: ResourceInterface) => {
  if (item.resourceType === 'C') {
    return <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
  }

  if (item.resourceType === 'R' && item.parentId !== '0') {
    return <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
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
    <Menu>
      <Menu.Target>
        <ActionIcon variant="transparent" color="dark" size="sm">
          <IconDotsVertical style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuItem
          w={42}
          color="red"
          leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        />
        {renderAddBtn(item) && <MenuItem w={42} color="blue" leftSection={renderAddBtn(item)} />}
      </Menu.Dropdown>
    </Menu>
  </Group>
);

export { renderActions, renderBanGrayBadge, renderNoneGrayBadge };
