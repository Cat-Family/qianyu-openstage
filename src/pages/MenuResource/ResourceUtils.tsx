import React from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Menu,
  MenuItem,
  Modal,
  TextInput,
  Tooltip,
  rem,
} from '@mantine/core';

import {
  IconBan,
  IconDotsVertical,
  IconPencil,
  IconPlus,
  IconQuestionMark,
  IconTrash,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { ResourceInterface } from '../../ts/types/interface/menu.res.interface';
import { IconCombobox } from '../../components/IconCombobox/IconCombobox';
import { ResourceTypeCombobox } from '../../components/ResourceTypeCombobox/ResourceTypebobox';
import { useEditMenuResource } from '../../hooks/actions/useMenuResource';

const renderBanGrayBadge = (message: string) => (
  <Tooltip label={message}>
    <Badge style={{ cursor: 'help' }} size="sm" radius="sm" color="gray" variant="light">
      <Center>
        <IconBan width={14} height={14} />
      </Center>
    </Badge>
  </Tooltip>
);

const renderNoneGrayBadge = (message: string) => (
  <Tooltip label={message}>
    <Badge style={{ cursor: 'help' }} size="sm" radius="sm" color="gray" variant="light">
      <Center>
        <IconQuestionMark width={14} height={14} />
      </Center>
    </Badge>
  </Tooltip>
);

const renderAddBtn = (item: ResourceInterface) => {
  if (item.resourceType === 'C') {
    return <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
  }

  if (item.resourceType === 'R' && item.parentId !== '0') {
    return <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
  }

  return null;
};

const renderActions = (item: ResourceInterface) => {
  const form = useForm({
    initialValues: {
      resourceId: item.resourceId || '',
      resourceIcon: item.resourceIcon || '',
      resourceName: item.resourceName || '',
      resourceType: item.resourceType || '',
      resourcePath: item.resourcePath || '',
      resourceParams: item.resourceParams || '',
      resourcePerms: item.resourcePerms || '',
      resourceLevel: item.resourceLevel || '',
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const { editMenuResource, loading, error } = useEditMenuResource();

  return (
    <Group wrap="nowrap">
      <ActionIcon variant="subtle" size="sm" onClick={open}>
        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="transparent" color="dark" size="sm">
            <IconDotsVertical style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <MenuItem
            w={42}
            color="red"
            leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          />
          {renderAddBtn(item) && <MenuItem w={42} color="blue" leftSection={renderAddBtn(item)} />}
        </Menu.Dropdown>
      </Menu>

      <Modal opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={form.onSubmit((values) => {
            const formData = new FormData();
            const keys = Object.keys(values);
            keys.map((key) => values[key] && formData.append(key, values[key]));
            editMenuResource('/resource/update', { method: 'PATCH', body: formData });
          })}
        >
          <TextInput label="ID" {...form.getInputProps('resourceId')} disabled />
          <TextInput label="资源名称" {...form.getInputProps('resourceName')} />
          <ResourceTypeCombobox {...form.getInputProps('resourceType')} defaultDisabled />
          <IconCombobox
            {...form.getInputProps('resourceIcon')}
            defaultDisabled={
              item.resourceType === 'F' || (item.resourceType === 'R' && item.parentId !== '0')
            }
          />
          {item.resourceType === 'R' && (
            <TextInput label="资源路径" {...form.getInputProps('resourcePath')} />
          )}
          {item.resourceType === 'R' && (
            <TextInput label="资源参数" {...form.getInputProps('resourceParams')} />
          )}
          {item.resourceType === 'F' && (
            <TextInput label="资源权限" {...form.getInputProps('resourcePerms')} />
          )}
          <TextInput label="资源相对层级" {...form.getInputProps('resourceLevel')} />
          <Button loading={loading} loaderProps={{ type: 'dots' }} fullWidth mt="md" type="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </Group>
  );
};

export { renderActions, renderBanGrayBadge, renderNoneGrayBadge };
