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
    {
      link: '/notice',
      label: 'Notice',
      icon: IconMessages
    },
    { link: '/stores', label: 'Stores', icon: IconBuildingStore }
  ],
  api: [
    { link: '/versions', label: 'Versions', icon: IconVersions },
    { link: '/api', label: 'API', icon: IconApi },

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
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: 'System', value: 'system' },
              { label: 'Api', value: 'api' }
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
