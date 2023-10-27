import React from 'react';
import { Container, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <>
      <div className={classes.spacer} />
      <div className={classes.wrapper}>
        <Container size={1100}>
          <div className={classes.inner}>
            <div className={classes.logoSection}>
              {/* <img title="logo" src="/logo.png" className={classes.logo} /> */}
              <Text size="xl" fw={500}>
                千渝掌柜 - 开放平台
              </Text>
              <Text size="sm" c="dimmed">
                By Cat-Family
              </Text>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
