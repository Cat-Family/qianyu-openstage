import React from 'react'
import { Burger } from '@mantine/core'
import { ColorSchemeControl } from '@mantine/ds'
import useStyles from './HeaderMobile.styles'

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
        <div className={classes.logo}>千渝掌柜</div>
        <ColorSchemeControl />
      </div>
    </div>
  )
}
