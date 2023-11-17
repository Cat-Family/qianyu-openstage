import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { ResourceInterface } from '@/ts/types/interface/menu.res.interface';
import { IconMap, IconMapKey } from '../../utils/icon';
import classes from './NavbarLinksGroup.module.css';

interface LinkGroupProps extends ResourceInterface {
  initiallyOpened?: boolean;
}

export function LinksGroup({
  initiallyOpened,
  resourceId,
  resourcePath,
  resourceName,
  children,
  resourceIcon,
}: LinkGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const items = children?.map((link) => (
    <Text<typeof Link>
      key={link.resourceId}
      component={Link}
      className={classes.link}
      to={link?.resourcePath || '#'}
    >
      {link.resourceName}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        key={resourceId}
        onClick={() => (resourcePath ? navigate(resourcePath) : setOpened((o) => !o))}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              {IconMap[resourceIcon as IconMapKey]}
            </ThemeIcon>
            <Box ml="md">{resourceName}</Box>
          </Box>
          {children.length > 0 && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {children.length > 0 ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
