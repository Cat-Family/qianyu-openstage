import React, { ReactElement } from 'react';
import { ActionIcon, Box, Group, StyleProp, ThemeIcon, rem, Badge, Text } from '@mantine/core';
import { IconPencil, IconTrash, IconPlus, IconReplace } from '@tabler/icons-react';
import { IconMap, IconMapKey } from '../../utils/icon';
import { ParseResourceType } from '../../constant/ResourceType';
import { ResourceInterface, ResourceTable } from '../../ts/types/interface/menu.res.interface';

/**
 * generate different color badges based on resourceType
 *
 * @param resourceType
 * @return gradient style
 */
const generateColorGradient = (resourceType: string) => {
  switch (resourceType) {
    case 'C':
      return { from: 'blue', to: 'blue', deg: 180 };
    case 'R':
      return { from: 'orange', to: 'orange', deg: 180 };
    case 'F':
      return { from: 'green', to: 'green', deg: 180 };
    default:
      return { from: 'gray', to: 'gray', deg: 180 };
  }
};

/**
 * @description show gray badge
 *
 * @param text show message
 * @returns
 */
const renderGrayBadge = (text: string) => (
  <Badge w="100%" size="md" radius="sm" color="rgb(180, 180, 180)">
    {text}
  </Badge>
);

const columns: {
  name: string;
  uid: keyof ResourceTable;
  sortable?: boolean;
  searchable?: boolean;
  defaultShow?: boolean;
  w?: StyleProp<React.CSSProperties['width']> | undefined;
  tooltip?: string | ReactElement;
  render?: (item: ResourceInterface) => ReactElement | void;
}[] = [
  {
    name: '资源名称',
    uid: 'resourceName',
    searchable: true,
    defaultShow: true,
    w: 100,
  },
  {
    name: '资源类型',
    uid: 'resourceType',
    searchable: true,
    defaultShow: true,
    w: 50,
    render: (item) =>
      item.resourceType && (
        <Badge
          size="md"
          radius="sm"
          variant="gradient"
          gradient={generateColorGradient(item.resourceType)}
        >
          {ParseResourceType(item.resourceType)}
        </Badge>
      ),
  },
  {
    name: '资源路径',
    uid: 'resourcePath',
    searchable: true,
    defaultShow: true,
    w: 100,
    render: (item) => (
      <>
        {!item.resourcePath && renderGrayBadge('不可设置')}
        <Text
          w="max-content"
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {item.resourcePath}
        </Text>
      </>
    ),
  },
  {
    name: '资源参数',
    uid: 'resourceParams',
    searchable: true,
    defaultShow: true,
    w: 100,
    render: (item) => (
      <>
        {item.resourceType !== 'R' ? (
          renderGrayBadge('不可设置')
        ) : item.resourceParams ? (
          <Text
            w="max-content"
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {item.resourceParams}
          </Text>
        ) : (
          renderGrayBadge('暂未设置')
        )}
      </>
    ),
  },
  {
    name: '资源权限',
    uid: 'resourcePerms',
    searchable: true,
    defaultShow: true,
    w: 100,
    render: (item) => (
      <>
        {item.resourceType !== 'F' ? (
          renderGrayBadge('不可设置')
        ) : item.resourcePerms ? (
          <Text
            w="max-content"
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {item.resourcePerms}
          </Text>
        ) : (
          renderGrayBadge('暂未设置')
        )}
      </>
    ),
  },
  {
    name: '操作',
    uid: 'actions',
    sortable: false,
    searchable: false,
    defaultShow: true,
    w: 100,
    render: (_item: ResourceInterface) => (
      <Group wrap="nowrap">
        {(_item.resourceType === 'C' || (_item.resourceType === 'R' && _item.parentId !== '0')) && (
          <ActionIcon
            variant="filled"
            color="blue"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        )}
        {_item.resourceType === 'F' && !_item.resourcePerms && (
          <ActionIcon
            variant="filled"
            color="green"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconReplace style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        )}
        <ActionIcon
          variant="filled"
          color="gray"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="red"
          size="sm"
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
