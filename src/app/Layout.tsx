import { useState } from 'react'
import {
  AppShell,
  Header,
  Footer,
  Title,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  Group,
  Box,
  Text,
  Flex
} from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { NavbarSegmented } from './NavBar'
import { SegmentedToggle } from './components/SegmentedToggle/SegmentedToggle'
import { IconSearch } from '@tabler/icons-react'
import { spotlight } from '@mantine/spotlight'

export default function Layout() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <NavbarSegmented
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ xs: 300, sm: 300, md: 300, lg: 300 }}
        />
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Flex direction="column" align="center" justify="center">
              <Title order={1} size="h3" color="blue.9" align="center">
                千渝掌柜
              </Title>
              <Text size="xs" color="gray">
                开放平台
              </Text>
            </Flex>
            <Box sx={{ flex: 1 }} />
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Group position="center" my="xl" pr="xl">
                <ActionIcon size="lg" onClick={() => spotlight.open()}>
                  <IconSearch size="1.4rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </MediaQuery>
            <SegmentedToggle />
          </Box>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  )
}
