import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  Box
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { forwardRef } from 'react'

interface UserButtonProps extends UnstyledButtonProps {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={theme => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
      {...others}
    >
      <Group spacing="xs" sx={{ flexWrap: 'nowrap' }}>
        <Avatar src={image} radius="xl" />

        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Box>
        {icon || <IconChevronRight size="1rem" stroke={1.5} />}
      </Group>
    </UnstyledButton>
  )
)

export default UserButton
