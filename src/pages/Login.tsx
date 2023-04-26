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
  Checkbox,
  Anchor,
  Stack,
  Container,
  Title,
  ActionIcon
} from '@mantine/core'

import {
  IconBrandAlipay,
  IconBrandGithub,
  IconBrandQq,
  IconBrandWechat
} from '@tabler/icons-react'

export function AuthenticationForm(props: PaperProps) {
  const github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI
  const alipay_app_id = process.env.REACT_APP_ALIPAY_APP_ID
  const [type, toggle] = useToggle(['login', 'register'])

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
        val.length <= 6 ? 'Password should include at least 6 characters' : null
    }
  })

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" {...props}>
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={event =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

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

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={event =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
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
                `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user:email`,
                'DescriptiveWindowName',
                'resizable,scrollbars,status'
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
            radius="xl"
            sx={theme => ({
              backgroundColor:
                theme.colors.green[theme.colorScheme === 'dark' ? 9 : 6],
              color: '#fff',
              '&:hover': {
                backgroundColor:
                  theme.colors.green[theme.colorScheme === 'dark' ? 9 : 9]
              }
            })}
          >
            <IconBrandWechat size="1rem" />
          </ActionIcon>
          <ActionIcon
            onClick={async () => {
              window.open(
                `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${alipay_app_id}&scope=auth_user&redirect_uri=${'https://qianyushop.shop/'}&state=init`,
                'DescriptiveWindowName',
                'resizable,scrollbars,status'
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
      </Paper>
    </Container>
  )
}
