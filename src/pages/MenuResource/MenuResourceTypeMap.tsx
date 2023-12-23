import React from 'react';
import { Badge, Center, Tooltip } from '@mantine/core';
import { IconBraces, IconMenu, IconRoute } from '@tabler/icons-react';

const resourceTypeMap = new Map();
resourceTypeMap.set(
  'C',
  <Tooltip label="目录">
    <Badge
      style={{ cursor: 'help' }}
      size="md"
      radius="sm"
      variant="gradient"
      gradient={{ from: 'blue', to: 'blue', deg: 180 }}
    >
      <Center>
        <IconMenu width={12} height={12} />
      </Center>
    </Badge>
  </Tooltip>
);
resourceTypeMap.set(
  'R',
  <Tooltip label="路由">
    <Badge
      style={{ cursor: 'help' }}
      size="md"
      radius="sm"
      variant="gradient"
      gradient={{ from: 'orange', to: 'orange', deg: 180 }}
    >
      <Center>
        <IconRoute width={12} height={12} />
      </Center>
    </Badge>
  </Tooltip>
);
resourceTypeMap.set(
  'F',
  <Tooltip label="功能">
    <Badge
      style={{ cursor: 'help' }}
      size="md"
      radius="sm"
      variant="gradient"
      gradient={{ from: 'green', to: 'green', deg: 180 }}
    >
      <Center>
        <IconBraces width={12} height={12} />
      </Center>
    </Badge>
  </Tooltip>
);

const resourceNameOfTypeMap = new Map();
resourceNameOfTypeMap.set('C', '目录');
resourceNameOfTypeMap.set('R', '路由');
resourceNameOfTypeMap.set('F', '功能');

export default resourceTypeMap;
export { resourceNameOfTypeMap };
