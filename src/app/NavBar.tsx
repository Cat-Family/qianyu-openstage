import { useState } from 'react'
import {
  Box,
  MantineNumberSize,
  Menu,
  Navbar,
  ScrollArea,
  SegmentedControl,
  SpacingValue,
  SystemProp,
  createStyles,
  getStylesRef,
  rem,
  Text
} from '@mantine/core'
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconDashboard,
  IconMessageCircle,
  IconSearch,
  IconPhoto,
  IconArrowsLeftRight,
  IconTrash
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import UserButton from './components/UserButton/UserButton'
import { spotlight } from '@mantine/spotlight'

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25)
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black
      }
    }
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color
      }
    }
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md
  }
}))

const tabs = {
  store: [
    { link: '/', label: 'Notifications', icon: IconBellRinging },
    { link: '/about', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings }
  ],
  general: [
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/users', label: 'Users', icon: IconUsers },
    { link: '', label: 'Orders', icon: IconShoppingCart },
    { link: '', label: 'Receipts', icon: IconLicense },
    { link: '', label: 'Reviews', icon: IconMessage2 },
    { link: '', label: 'Messages', icon: IconMessages },
    { link: '', label: 'Refunds', icon: IconReceiptRefund }
  ]
}

export function NavbarSegmented({
  p,
  hiddenBreakpoint,
  hidden,
  width
}: {
  p: SystemProp<SpacingValue> | undefined
  hiddenBreakpoint: MantineNumberSize | undefined
  hidden?: boolean | undefined
  width: Partial<Record<string, string | number>> | undefined
}) {
  const { classes, cx } = useStyles()
  const [section, setSection] = useState<'store' | 'general'>('store')
  const [active, setActive] = useState('Billing')

  const links = tabs[section].map(item => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <Navbar
      hiddenBreakpoint={hiddenBreakpoint}
      hidden={hidden}
      width={width}
      p={p}
      className={classes.navbar}
    >
      <Navbar.Section>
        <SegmentedControl
          value={section}
          onChange={(value: 'store' | 'general') => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Store', value: 'store' },
            { label: 'System', value: 'general' }
          ]}
        />
      </Navbar.Section>
      <ScrollArea mt="md">
        <Navbar.Section grow>{links}</Navbar.Section>
      </ScrollArea>
      <Box sx={{ flex: 1 }} />
      <Navbar.Section className={classes.footer}>
        <Menu withArrow>
          <Menu.Target>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Ann Nullpointer"
              email="anullpointer@yahoo.com"
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
            <Menu.Item
              onClick={() => spotlight.open()}
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar.Section>
    </Navbar>
  )
}
