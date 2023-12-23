import React, { ReactElement } from 'react';
import { StyleProp } from '@mantine/core';
import resourceTypeMap from './MenuResourceTypeMap';
import HoverText from './HoverText';
import { renderActions, renderBanGrayBadge, renderNoneGrayBadge } from './ResourceUtils';
import { ResourceInterface, ResourceTable } from '../../ts/types/interface/menu.res.interface';

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
    w: 60,
    render: (item) => resourceTypeMap.get(item.resourceType),
  },
  {
    name: '资源路径',
    uid: 'resourcePath',
    searchable: true,
    defaultShow: true,
    w: 120,
    render: (item) =>
      item.resourcePath ? HoverText(item.resourcePath) : renderBanGrayBadge('只对路由有效'),
  },
  {
    name: '资源参数',
    uid: 'resourceParams',
    searchable: true,
    defaultShow: true,
    w: 100,
    render: (item) => (
      <>
        {item.resourceType !== 'R'
          ? renderBanGrayBadge('只对路由有效')
          : item.resourceParams
            ? HoverText(item.resourceParams)
            : renderNoneGrayBadge('暂未设置')}
      </>
    ),
  },
  {
    name: '资源权限',
    uid: 'resourcePerms',
    searchable: true,
    defaultShow: true,
    w: 150,
    render: (item) => (
      <>
        {item.resourceType !== 'F'
          ? renderBanGrayBadge('只对功能有效')
          : item.resourcePerms
            ? HoverText(item.resourcePerms)
            : renderNoneGrayBadge('暂未设置')}
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
    render: renderActions,
  },
];

export default columns;
