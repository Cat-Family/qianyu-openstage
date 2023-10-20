import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton, ScrollArea } from '@mantine/core';
import { useOutlet } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import classes from './Shell.module.css';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const currentOutlet = useOutlet();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          60 links in a scrollable section
          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main
        className={classes.main}
        pt="var(--app-shell-header-offset, 0px)"
        pr="var(--app-shell-aside-offset, 0px)"
        pb="var(--app-shell-footer-offset, 0px)"
        pl="var(--app-shell-navbar-offset, 0px)"
      >
        <div className={classes.content}>{currentOutlet}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
