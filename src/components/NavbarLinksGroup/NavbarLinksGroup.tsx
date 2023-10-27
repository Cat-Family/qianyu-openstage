import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { Icon2fa, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  menuName: string;
  initiallyOpened?: boolean;
  children?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, menuName, initiallyOpened, children }: LinksGroupProps) {
  const hasLinks = Array.isArray(children);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? children : []).map((link: any) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link?.link}
      key={link.id}
      onClick={(event) => event.preventDefault()}
    >
      {link.menuName}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon2fa style={{ width: rem(18), height: rem(18) }} />
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
