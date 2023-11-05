import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCategory2, IconChevronRight, IconDashboard } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './NavbarLinksGroup.module.css';

const IconMap = {
  IconDashboard: <IconDashboard style={{ width: rem(18), height: rem(18) }} />,
  IconCategory2: <IconCategory2 style={{ width: rem(18), height: rem(18) }} />,
};
interface LinksGroupProps {
  id: string;
  icon: keyof typeof IconMap;
  menuName: string;
  path?: string;
  initiallyOpened?: boolean;
  children?: { menuName: string; path: string; id: string }[];
}

export function LinksGroup({
  id,
  icon,
  path,
  menuName,
  initiallyOpened,
  children,
}: LinksGroupProps) {
  const hasLinks = children?.length && children?.length > 0;
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const items = (hasLinks ? children : []).map((link: any) => (
    <Text<typeof Link> component={Link} className={classes.link} to={link?.path} key={link.id}>
      {link.menuName}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        key={id}
        onClick={() => (path ? navigate(path) : setOpened((o) => !o))}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              {IconMap[icon]}
            </ThemeIcon>
            <Box ml="md">{menuName}</Box>
          </Box>
          {hasLinks && (
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
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
