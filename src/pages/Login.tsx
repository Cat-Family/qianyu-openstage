import {useToggle, upperFirst, useDisclosure} from '@mantine/hooks'
import {useForm} from '@mantine/form'
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
    Box,
    Modal,
    PinInput, Center, Flex
} from '@mantine/core'

import {
    IconBrandAlipay,
    IconBrandGithub,
    IconBrandQq, IconCheck,
    IconX
} from '@tabler/icons-react'
import useFetch from '../hooks/useFetch'
import {useEffect, useState} from 'react'
import {notifications} from '@mantine/notifications'
import {useNavigate} from "react-router-dom";
import AuthenticationModal from "../components/Epsilon3/Modal/AuthenticationModal";

interface Post {
    code: number
    message: string
    data: {
        twoFA: boolean
    }
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
    const {classes} = useStyle()
    const navigate = useNavigate()
    const github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI
    const alipay_app_id = process.env.REACT_APP_ALIPAY_APP_ID
    const windowFeatures =
        'left=600,top=200,width=500,height=500,scrollbars,status'

    const form = useForm({
        initialValues: {
            account: '',
            password: '',
        },

        validate: {
            password: val =>
                val.length <= 4 ? 'Password should include at least 6 characters' : null
        }
    })
    const [openAuthenticationModal,setOpenAuthenticationModal] = useState<boolean>(false);
    const [twoFACode, setTwoFACode] = useState<string>('')

    const {fetchData, data: loginData, error} = useFetch<Post>('auth' +
        '/user/login.action', {
        method: 'POST',
        body: JSON.stringify({
            userAccount: form.values.account,
            userPwd: 'e10adc3949ba59abbe56e057f20f883e'
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })

    const handleCodeEntered = (code: string) => {
        setTwoFACode(code)
        twoFALogin?.()
    };

    const handleAuthenticationModalClose = () => {
        setOpenAuthenticationModal(false)
    };

    const {fetchData: twoFALogin, data: twoFARes, error: twoFAError} = useFetch<Post>('auth/user/2faLogin.action', {
        method: 'POST',
        body: JSON.stringify({
            code: twoFACode
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })

    useEffect(() => {
        if (error || twoFAError) {
            notifications.show({
                id: 'login-error',
                withCloseButton: true,
                autoClose: 5000,
                title: error?.name || twoFAError?.name ,
                message: error?.message || twoFAError?.message,
                color: 'red',
                icon: <IconX/>,
                radius: 'lg',
                className: 'my-notification-class',
                loading: false
            })
        }
        if (loginData) {
            setOpenAuthenticationModal(true)
        }
    }, [error, loginData, twoFAError])

    useEffect(() => {
        if (twoFACode.length === 6) {
            twoFALogin?.()
        }
    },[twoFACode])

    useEffect(() => {
        if (twoFARes) {
            setOpenAuthenticationModal(false)
            notifications.show({
                id: 'login-success',
                withCloseButton: true,
                autoClose: 5000,
                title: '成功' ,
                message: '登录成功',
                color: 'green',
                icon: <IconCheck/>,
                radius: 'lg',
                className: 'my-notification-class',
                loading: false
            })
            navigate('/')
        }
    },[twoFARes])

    return (
        <div className={classes.wrapper}>
            <Paper withBorder className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md">
                    欢迎使用
                </Title>
                <Title order={2} className={classes.title} ta="center" mb={50}>
                    千渝掌柜开放平台!
                </Title>
                <Box sx={{flex: 1}}/>
                <form onSubmit={form.onSubmit((async (values) => {
                    if (values) {
                        console.log(values)
                        fetchData?.()
                    }
                }))}>
                    <Stack>
                        <TextInput
                            required
                            label="Account"
                            placeholder="hello@mantine.dev"
                            value={form.values.account}
                            onChange={event =>
                                form.setFieldValue('account', event.currentTarget.value)
                            }
                            error={form.errors.account && 'Invalid account'}
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
                        <Button type="submit" radius="xl">
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
                        <IconBrandGithub size="1rem"/>
                    </ActionIcon>
                    <ActionIcon
                        onClick={async () => {
                            window.open(
                                `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${alipay_app_id}&scope=auth_user&redirect_uri=
http://82.157.67.120:7777/qy/api/v1/os/oauth2/zfb/login.action&state=init`,
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
                        <IconBrandAlipay size="1rem"/>
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
                        <IconBrandQq size="1rem"/>
                    </ActionIcon>
                </Group>

                <Box sx={{flex: 4}}/>
                <Text align="center">
                    Copy right by @<a href="https://github.com/Cat-Family">Cat Family</a>
                </Text>
            </Paper>

            {/*<Modal*/}
            {/*    centered*/}
            {/*    opened={opened}*/}
            {/*    onClose={close}*/}
            {/*    withCloseButton={false}*/}
            {/*    overlayProps={{*/}
            {/*        blur: 3,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Flex*/}
            {/*        justify="center"*/}
            {/*        align="center"*/}
            {/*        direction="column"*/}
            {/*        pb={20}*/}
            {/*        gap="xl">*/}
            {/*        <Text fw={700} size='xl'>*/}
            {/*            双重认证*/}
            {/*        </Text>*/}
            {/*        <PinInput*/}
            {/*            autoFocus*/}
            {/*            size="xl"*/}
            {/*            length={6}*/}
            {/*            type="number"*/}
            {/*            placeholder=""*/}
            {/*            value={twoFACode}*/}
            {/*            onChange={value => {*/}
            {/*                    setTwoFACode(value)*/}
            {/*            }}/>*/}
            {/*    </Flex>*/}

            {/*</Modal>*/}
            <AuthenticationModal
                title={"双重认证"}
                withCloseButton={false}
                opened={openAuthenticationModal}
                length={6}
                onCodeEntered={handleCodeEntered}
                onClose={handleAuthenticationModalClose}/>
        </div>
    )
}
