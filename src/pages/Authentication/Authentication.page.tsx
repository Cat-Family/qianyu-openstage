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
import md5 from 'md5';
import { IconBrandAlipay, IconBrandGithub } from '@tabler/icons-react';
import useAuthentication from '../../hooks/actions/useLogin';
import classes from './Authentication.page.module.css';

const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
const redirect_uri_github = import.meta.env.VITE_REDIRECT_URI_GITHUB;
const redirect_uri_alipay = import.meta.env.VITE_REDIRECT_URI_ALIPAY;
const alipay_app_id = import.meta.env.VITE_ALIPAY_APP_ID;

const OauthList = {
  alipay: `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${alipay_app_id}&scope=auth_user&redirect_uri=
${redirect_uri_alipay}&state=init`,
  github: `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user:email&redirect_uri=${redirect_uri_github}`,
};

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

  const { fetchLogin, loading } = useAuthentication();

  const handleOauth = ({ type }: { type: 'github' | 'alipay' }) => {
    window.location.href = OauthList[type];
  };

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
          onSubmit={form.onSubmit((values) => {
            const formData = new FormData();
            formData.append('userAccount', form.values.account);
            formData.append('userPwd', md5(form.values.password));
            values &&
              fetchLogin('/auth/user/login.action', {
                method: 'POST',
                body: formData,
              });
          })}
        >
          <LoadingOverlay
            visible={loading}
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
              onClick={() => handleOauth({ type: 'github' })}
              variant="filled"
              color="dark"
              radius="xl"
            >
              <IconBrandGithub size="1rem" />
            </ActionIcon>
            <ActionIcon
              onClick={async () => handleOauth({ type: 'alipay' })}
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
