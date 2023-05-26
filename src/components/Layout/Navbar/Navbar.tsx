import React from 'react'
import { ScrollArea, rem } from '@mantine/core'
import NavbarMainLink from './NavbarMainLink/NavbarMainLink'

import mainLinks from './main-links'
import useStyles from './Navbar.styles'

export default function Navbar({ data, opened, onClose }: any) {
  const { classes, cx } = useStyles()

  const main = mainLinks.map((item: any) => (
    <NavbarMainLink
      key={item.to}
      to={item.to}
      color={item.color}
      icon={<item.icon size={rem(item.rawIcon ? 30 : 18)} stroke={2.2} />}
      onClick={onClose}
      rawIcon={item.rawIcon}
    >
      {item.label}
    </NavbarMainLink>
  ))

  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <ScrollArea h="100vh" type="scroll">
        <div className={classes.body}>{main}</div>
      </ScrollArea>
    </nav>
  )
}
