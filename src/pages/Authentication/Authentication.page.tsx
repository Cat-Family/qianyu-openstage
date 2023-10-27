import React from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Box,
  Stack,
  Divider,
  Group,
  ActionIcon,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandAlipay, IconBrandGithub } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import useAuthentication from '../../hooks/actions/useLogin';
import classes from './Authentication.page.module.css';

const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
const redirect_uri_github = import.meta.env.VITE_REDIRECT_URI_GITHUB;
const redirect_uri_alipay = import.meta.env.VITE_REDIRECT_URI_ALIPAY;
const alipay_app_id = import.meta.env.VITE_ALIPAY_APP_ID;
const windowFeatures = 'left=600,top=200,width=500,height=500,scrollbars,status';

export function Authentication() {
  const form = useForm({
    initialValues: {
      account: '',
      password: '',
    },
    validate: {
      password: (val) => (val.length <= 4 ? 'Password should include at least 6 characters' : null),
    },
  });

  const [visible, { toggle }] = useDisclosure(true);
  const { fetchLogin, loading } = useAuthentication(toggle);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md">
          欢迎使用
        </Title>
        <Title order={2} className={classes.title} ta="center" mb={50}>
          千渝掌柜开放平台!
        </Title>
        <Box style={{ flex: 1 }} />
        <form
          onSubmit={form.onSubmit(
            (values) =>
              values &&
              fetchLogin('auth/user/login.action', {
                method: 'POST',
                body: JSON.stringify({
                  userAccount: form.values.account,
                  userPwd: 'e10adc3949ba59abbe56e057f20f883e' || form.values.password,
                }),
              })
          )}
        >
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Stack>
            <TextInput
              required
              label="Account"
              placeholder="hello@mantine.dev"
              value={form.values.account}
              onChange={(event) => form.setFieldValue('account', event.currentTarget.value)}
              error={form.errors.account && 'Invalid account'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>
          <Divider label="Or continue with other" labelPosition="center" my="lg" />
          <Group grow mb="md" mt="md">
            <ActionIcon
              onClick={() => {
                window.open(
                  `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user:email&redirect_uri=${redirect_uri_github}`,
                  'Github',
                  windowFeatures
                );
              }}
              variant="filled"
              color="dark"
              radius="xl"
            >
              <IconBrandGithub size="1rem" />
            </ActionIcon>
            <ActionIcon
              onClick={async () => {
                console.log(alipay_app_id);
                window.open(
                  `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${alipay_app_id}&scope=auth_user&redirect_uri=
${redirect_uri_alipay}&state=init`,
                  'Alipay',
                  windowFeatures
                );
              }}
              variant="filled"
              radius="xl"
            >
              <IconBrandAlipay size="1rem" />
            </ActionIcon>
          </Group>
          <Button type="submit" fullWidth mt="xl" size="md" disabled={loading}>
            Login
          </Button>
        </form>

        <Box style={{ flex: 4 }} />
        <Text ta="center">
          Copy right by @<a href="https://github.com/Cat-Family">Cat Family</a>
        </Text>
      </Paper>
    </div>
  );
}
