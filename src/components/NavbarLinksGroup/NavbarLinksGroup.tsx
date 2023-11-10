import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCategory2, IconChevronRight, IconDashboard } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './NavbarLinksGroup.module.css';
import { MenuTree } from '@/ts/types/interface/menu.res.interface';

export const IconMap = {
  IconDashboard: <IconDashboard style={{ width: rem(18), height: rem(18) }} />,
  IconCategory2: <IconCategory2 style={{ width: rem(18), height: rem(18) }} />,
};

export type IconMapKey = keyof typeof IconMap;

interface LinkGroupProps extends MenuTree {
  initiallyOpened?: boolean;
}

export function LinksGroup({ routerItem, menuItem, initiallyOpened }: LinkGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const items = menuItem?.routers.map((link) => (
    <Text<typeof Link>
      component={Link}
      className={classes.link}
      to={link?.path}
      key={link.routerId}
    >
      {link.routerName}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        key={menuItem?.catalogId || routerItem?.routerId}
        onClick={() => (routerItem?.path ? navigate(routerItem.path) : setOpened((o) => !o))}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              {IconMap[menuItem?.catalogIcon || (routerItem?.routerIcon as IconMapKey)]}
            </ThemeIcon>
            <Box ml="md">{menuItem?.catalogName || routerItem?.routerName}</Box>
          </Box>
          {menuItem?.routers && (
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
      {menuItem?.routers ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
