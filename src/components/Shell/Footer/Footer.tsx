import React from 'react';
import { ActionIcon, Container, Group, Image, Text, rem } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import classes from './Footer.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Features', link: '#' },
      { label: 'Support', link: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: '#' },
      { label: 'Media assets', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: '#' },
      { label: 'GitHub discussions', link: '#' },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        c="dimmed"
        size="sm"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title} fw={700} size="lg">
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <>
      <div className={classes.spacer} />
      <footer className={classes.footer}>
        <Container size={1100} className={classes.inner}>
          <div className={classes.logo}>
            <Image src="/logo.png" w="39%" radius="md" />
            <Text size="xs" c="dimmed" className={classes.description}>
              A modern, proven open platform
            </Text>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            © {new Date().getFullYear()} Cat-Family. All rights reserved.
          </Text>

          <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    </>
  );
}
