import { Avatar, Burger, Menu, Image } from '@mantine/core'
import useStyles from './HeaderMobile.styles'
import {
  IconBell,
  IconCalendar,
  IconDeviceMobileMessage,
  IconHome,
  IconLogout,
  IconMapPin,
  IconMessageCircle,
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { HEADER_HEIGHT } from './HeaderDesktop.styles'

interface HeaderProps {
  navbarOpened: boolean
  toggleNavbar(): void
}

export function HeaderMobile({ navbarOpened, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.inner}>
        <Burger
          opened={navbarOpened}
          size="sm"
          onClick={toggleNavbar}
          aria-label="Toggle navbar"
        />
        <Image
          className={classes.logo}
          alt="千渝掌柜 - 开放平台 logo"
          src="/logo.png"
          radius="md"
          maw={HEADER_HEIGHT}
          mx="auto"
        />
        <Menu width={200} shadow="md" position="bottom-end" withArrow>
          <Menu.Target>
            <Avatar color="cyan" radius="xl" sx={{ cursor: 'pointer' }}>
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
      </div>
    </div>
  )
}
