import { useEffect, useState } from 'react'
import {
  Button,
  Group,
  Modal,
  ScrollArea,
  SegmentedControl,
  Space,
  useMantineTheme
} from '@mantine/core'
import {
  IconMessages,
  IconDashboard,
  IconBuildingStore,
  IconUserBolt,
  IconApi,
  IconVersions,
  IconSettings
} from '@tabler/icons-react'
import useStyles from './Navbar.styles'
import { matchSorter } from 'match-sorter'
import { Link, useLocation } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

const tabs = {
  system: [
    { link: '/', label: 'Dashboard', icon: IconDashboard },
    { link: '/caretakers', label: 'Caretakers', icon: IconUserBolt },
    {
      link: '/notice',
      label: 'Notice',
      icon: IconMessages
    },
    { link: '/stores', label: 'Stores', icon: IconBuildingStore },
    { link: '/settings', label: 'Settings', icon: IconSettings }
  ],
  api: [
    { link: '/versions', label: 'Versions', icon: IconVersions },
    { link: '/api', label: 'API', icon: IconApi }
  ]
}

export default function NavbarSegmented({ opened }: any) {
  const [openedDodal, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()
  const location = useLocation()
  const { classes, cx } = useStyles()
  const [section, setSection] = useState<'api' | 'system'>(
    matchSorter(tabs.system, location.pathname, { keys: ['link'] }).length > 0
      ? 'system'
      : 'api'
  )
  const [active, setActive] = useState(location.pathname)
  const links = tabs[section].map(item => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  useEffect(() => {}, [location])
  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <ScrollArea h="100vh" type="scroll">
        <div className={classes.body}>
          <SegmentedControl
            value={section}
            onChange={(value: 'api' | 'system') => setSection(value)}
            transitionDuration={500}
            transitionTimingFunction="linear"
            data={[
              { label: 'System', value: 'system' },
              { label: 'Api', value: 'api' }
            ]}
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[1]
            })}
          />
          <Space h="xl" />
          {links}
          <Space h="xl" />
          <Modal
            opened={openedDodal}
            onClose={close}
            title="Authentication"
            overlayProps={{
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3
            }}
          >
            {/* Modal content */}
          </Modal>

          <IconSettings onClick={open} stroke={1.5} />
        </div>
      </ScrollArea>
    </nav>
  )
}
