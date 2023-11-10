import React, { ReactElement, useState } from 'react';
import {
  Button,
  Flex,
  Group,
  Input,
  Modal,
  MultiSelect,
  Select,
  Stack,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconArrowRight, IconDotsVertical, IconRefresh } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import multiSelectClasses from './multiSelectClasses.module.css';
import { FetchData } from '../../ts/types/types/fetchData.type';

interface TableSearchProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T | 'actions';
    render?: (item: any) => ReactElement | void;
  }[];
  fetchData: FetchData;
  renderColumns: string[];
  setRenderColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

function TableSearch<T>({
  columns,
  renderColumns,
  setRenderColumns,
  fetchData,
}: TableSearchProps<T>) {
  const [searchItem, setSearchItem] = useState<string | null>(
    columns.filter((item) => item.searchable)[0].name
  );
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex wrap="wrap" gap="md">
        <Group style={{ flex: 1 }} wrap="nowrap">
          <Select
            w={120}
            value={searchItem}
            onChange={setSearchItem}
            allowDeselect={false}
            data={columns.filter((item) => item.searchable).map((item) => item.name)}
          />
          <TextInput style={{ flex: 1 }} miw={200} placeholder={`Search by ${searchItem}...`} />
        </Group>
        <MultiSelect
          w={189}
          classNames={multiSelectClasses}
          checkIconPosition="right"
          data={columns.map((item) => item.name)}
          placeholder="Columns"
          defaultValue={renderColumns}
          onChange={setRenderColumns}
        />
        <Group>
          <Button>Search</Button>
          <UnstyledButton onClick={() => fetchData('/catalog/list', { method: 'POST' })}>
            <IconRefresh
              style={{ width: rem(16), height: rem(16), lineHeight: rem(16) }}
              stroke={1.5}
            />
          </UnstyledButton>
          <UnstyledButton onClick={open}>
            <IconDotsVertical
              style={{ width: rem(16), height: rem(16), lineHeight: rem(16) }}
              stroke={1.5}
            />
          </UnstyledButton>
        </Group>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        title="Advanced search"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          {columns
            .filter((item) => item.searchable)
            .map((item) => (
              <Input key={item.name} placeholder={item.name} />
            ))}
          <Group style={{ alignSelf: 'end' }}>
            <Button variant="outline">Reset</Button>
            <Button rightSection={<IconArrowRight size={14} />}>Submit</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

export { TableSearch };
