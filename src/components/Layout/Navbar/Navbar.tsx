import { useEffect, useState } from 'react'
import { ScrollArea, SegmentedControl, Space } from '@mantine/core'
import {
  IconMessages,
  IconUsers,
  IconDashboard,
  IconBuildingStore,
  IconUserBolt,
  IconApi,
  IconVersions,
  IconToolsKitchen2
} from '@tabler/icons-react'
import useStyles from './Navbar.styles'
import { matchSorter } from 'match-sorter'
import { Link, useLocation } from 'react-router-dom'

const tabs = {
  system: [
    { link: '/', label: 'Dashboard', icon: IconDashboard },
    { link: '/caretakers', label: 'Caretakers', icon: IconUserBolt },
    { link: '/api', label: 'API', icon: IconApi },
    { link: '/system/messages', label: 'Messages', icon: IconMessages },
    { link: '/versions', label: 'Versions', icon: IconVersions }
  ],
  store: [
    { link: '/stores', label: 'Stores', icon: IconBuildingStore },
    {
      link: '/stores/messages',
      label: 'Messages',
      icon: IconMessages
    },
    {
      link: '/stores/menu',
      label: 'Menu',
      icon: IconToolsKitchen2
    },
    {
      link: '/customer',
      label: 'Customers',
      icon: IconUsers
    }
  ]
}

export default function Navbar({ opened }: any) {
  const location = useLocation()
  const { classes, cx } = useStyles()
  const [section, setSection] = useState<'store' | 'system'>(
    matchSorter(tabs.system, location.pathname, { keys: ['link'] }).length > 0
      ? 'system'
      : 'store'
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
            onChange={(value: 'store' | 'system') => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: 'System', value: 'system' },
              { label: 'Store', value: 'store' }
            ]}
          />
          <Space h="xl" />
          {links}
          <Space h="xl" />
        </div>
      </ScrollArea>
    </nav>
  )
}
