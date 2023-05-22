import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Title,
  ActionIcon,
  createStyles,
  rem,
  Box
} from '@mantine/core'

import {
  IconBrandAlipay,
  IconBrandGithub,
  IconBrandQq,
  IconX
} from '@tabler/icons-react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { notifications } from '@mantine/notifications'
interface Post {
  code: number
  message: string
}

const useStyle = createStyles(theme => ({
  wrapper: {
    minHeight: '100vh',
    background: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%'
    }
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}))

export function AuthenticationForm(props: PaperProps) {
  const { classes } = useStyle()
  const github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI
  const alipay_app_id = process.env.REACT_APP_ALIPAY_APP_ID
  const windowFeatures =
    'left=600,top=200,width=500,height=500,scrollbars,status'
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 4 ? 'Password should include at least 6 characters' : null
    }
  })
  const { fetchData, data, error } = useFetch<Post>('user/login.action', {
    method: 'POST',
    body: JSON.stringify({
      userEmail: form.values.email,
      userName: form.values.name,
      userPwd: form.values.password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  })

  useEffect(() => {
    if (error) {
      console.log(error)
      notifications.show({
        id: 'login-error',
        withCloseButton: true,
        autoClose: 5000,
        title: error.name,
        message: error.message,
        color: 'red',
        icon: <IconX />,
        radius: 'lg',
        className: 'my-notification-class',
        loading: false
      })
    }
  }, [error])

  return (
    <div className={classes.wrapper}>
      <Paper withBorder className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md">
          欢迎使用
        </Title>
        <Title order={2} className={classes.title} ta="center" mb={50}>
          千渝掌柜开放平台!
        </Title>
        <Box sx={{ flex: 1 }} />
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl" onClick={fetchData}>
              {upperFirst('submit')}
            </Button>
          </Group>
        </form>
        <Divider
          label="Or continue with other"
          labelPosition="center"
          my="lg"
        />
        <Group grow mb="md" mt="md">
          <ActionIcon
            onClick={() => {
              window.open(
                `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user:email&redirect_uri=${redirect_uri}`,
                'Github',
                windowFeatures
              )
            }}
            radius="xl"
            sx={theme => ({
              backgroundColor:
                theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
              color: '#fff',
              '&:hover': {
                backgroundColor:
                  theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6]
              }
            })}
          >
            <IconBrandGithub size="1rem" />
          </ActionIcon>
          <ActionIcon
            onClick={async () => {
              window.open(
                `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${alipay_app_id}&scope=auth_user&redirect_uri=${'https://qianyushop.shop/'}&state=init`,
                'Alipay',
                windowFeatures
              )
            }}
            radius="xl"
            sx={theme => ({
              backgroundColor:
                theme.colors.blue[theme.colorScheme === 'dark' ? 9 : 6],
              color: '#fff',
              '&:hover': {
                backgroundColor:
                  theme.colors.blue[theme.colorScheme === 'dark' ? 9 : 9]
              }
            })}
          >
            <IconBrandAlipay size="1rem" />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            sx={theme => ({
              backgroundColor:
                theme.colors.red[theme.colorScheme === 'dark' ? 9 : 6],
              color: '#fff',
              '&:hover': {
                backgroundColor:
                  theme.colors.red[theme.colorScheme === 'dark' ? 9 : 9]
              }
            })}
          >
            <IconBrandQq size="1rem" />
          </ActionIcon>
        </Group>

        <Box sx={{ flex: 4 }} />
        <Text align="center">
          Copy right by @<a href="https://github.com/Cat-Family">Cat Family</a>
        </Text>
      </Paper>
    </div>
  )
}
