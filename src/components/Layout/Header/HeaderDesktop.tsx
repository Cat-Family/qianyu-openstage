import {
  IconBell,
  IconCalendar,
  IconChevronDown,
  IconDeviceMobileMessage,
  IconExternalLink,
  IconHome,
  IconLogout,
  IconMapPin,
  IconMessageCircle,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser
} from '@tabler/icons-react'
import {
  Code,
  Menu,
  UnstyledButton,
  Text,
  RemoveScroll,
  rem,
  Avatar,
  useMantineColorScheme,
  Center,
  Box,
  SegmentedControl,
  Input,
  Button
} from '@mantine/core'
import { useSpotlight } from '@mantine/spotlight'
import corePackageJson from '../../../../package.json'
import { useDirectionContext } from '../DirectionContext'
import useStyles from './HeaderDesktop.styles'
import { Link } from 'react-router-dom'
import { DirectionControl, SearchControl } from '@mantine/ds'

const versions = [
  { v: 'v5', name: '5.10.5', link: 'https://v5.mantine.dev/' },
  { v: 'v4', name: '4.2.12', link: 'https://v4.mantine.dev/' },
  { v: 'v3', name: '3.6.14', link: 'https://v3.mantine.dev/' },
  { v: 'v2', name: '2.5.1', link: 'https://v2.mantine.dev/' },
  { v: 'v1', name: '1.3.1', link: 'https://v1.mantine.dev/' }
]

export function HeaderDesktop() {
  const { classes, cx } = useStyles()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  // @ts-ignore
  const { dir, toggleDirection } = useDirectionContext()
  const spotlight = useSpotlight()

  const versionItems = versions.map(item => (
    <Menu.Item
      key={item.name}
      component="a"
      href={item.link}
      target="_blank"
      rightSection={<IconExternalLink size={rem(14)} stroke={1.5} />}
    >
      <b>{item.v}</b>
      <Text span color="dimmed" fz="xs">
        ({item.name})
      </Text>
    </Menu.Item>
  ))

  return (
    <div className={cx(classes.header, RemoveScroll.classNames.fullWidth)}>
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>千渝掌柜 - 开放平台</div>

          <Menu width={160} position="bottom-start" withArrow>
            <Menu.Target>
              <UnstyledButton mt={2}>
                <Code className={classes.version}>
                  v{corePackageJson.version}{' '}
                  <IconChevronDown size={rem(12)} className={classes.chevron} />
                </Code>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>{versionItems}</Menu.Dropdown>
          </Menu>
        </div>
      </div>

      <SearchControl onClick={spotlight.openSpotlight} />
      <Center>
        <DirectionControl direction={dir} toggleDirection={toggleDirection} />
        <SegmentedControl
          sx={{
            margin: '0 21px'
          }}
          value={colorScheme}
          onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
          data={[
            {
              value: 'light',
              label: (
                <Center>
                  <IconSun size="1rem" stroke={1.5} />
                  <Box ml={10}>Light</Box>
                </Center>
              )
            },
            {
              value: 'dark',
              label: (
                <Center>
                  <IconMoon size="1rem" stroke={1.5} />
                  <Box ml={10}>Dark</Box>
                </Center>
              )
            }
          ]}
        />

        <Menu width={200} shadow="md" position="bottom-end" withArrow>
          <Menu.Target>
            <Avatar
              color="cyan"
              radius="xl"
              sx={{ cursor: 'pointer', marginRight: '21px' }}
            >
              LL
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
            <Menu.Item icon={<IconBell size={14} />}>Notifications</Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Navigation</Menu.Label>
            <Menu.Item icon={<IconHome size={14} />}>Home</Menu.Item>
            <Menu.Item icon={<IconCalendar size={14} />}>Calendar</Menu.Item>
            <Menu.Item icon={<IconMapPin size={14} />}>Locations</Menu.Item>
            <Menu.Item icon={<IconDeviceMobileMessage size={14} />}>
              Photos
            </Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>Friends</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              component={Link}
              to="/users/login"
              icon={<IconLogout size={14} />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Center>
    </div>
  )
}
