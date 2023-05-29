import React from 'react'
import { Container, Text, Group } from '@mantine/core'
import { TwitterButton, DiscordButton, GithubIcon } from '@mantine/ds'
import useStyles from './Footer.styles'

interface FooterProps {
  withNavbar?: boolean
}

export function Footer({ withNavbar }: FooterProps) {
  const { classes, cx } = useStyles()

  return (
    <>
      <div className={classes.spacer} />
      <div
        className={cx(classes.wrapper, { [classes.withNavbar]: withNavbar })}
      >
        <Container size={1100}>
          <div className={classes.inner}>
            <div className={classes.logoSection}>
              <img title="logo" src="/logo.png" className={classes.logo} />
              <Text size="xl" weight={500}>
                千渝掌柜 - 开放平台
              </Text>
              <Text size="sm" color="dimmed">
                By Cat-Family
              </Text>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
