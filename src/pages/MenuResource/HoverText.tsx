import React from 'react';
import { HoverCard, Text } from '@mantine/core';

const HoverText = (resourcePath: string) => (
    <HoverCard width={280} shadow="md">
      <HoverCard.Target>
        <Text
          w="max-content"
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {resourcePath}
        </Text>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">{resourcePath}</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );

export default HoverText;
