import React, { ReactElement, useState } from 'react';
import {
  Button,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Select,
  Stack,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconArrowRight, IconDotsVertical, IconRefresh, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import multiSelectClasses from './multiSelectClasses.module.css';
import { FetchData } from '../../ts/types/types/fetchData.type';
import classes from './TableSearch.module.css';

interface TableSearchProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T | 'actions';
    render?: (item: any) => ReactElement | void;
  }[];
  pageNum: number;
  pageSize: number;
  fetchData?: FetchData;
  renderColumns: string[];
  setRenderColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

function TableSearch<T>({
  columns,
  renderColumns,
  setRenderColumns,
  fetchData,
  pageSize,
  pageNum,
}: TableSearchProps<T>) {
  const [searchItem, setSearchItem] = useState<string | null>(
    columns.filter((item) => item.searchable)[0].name
  );
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex wrap="wrap" gap="md" justify="center">
        <Group wrap="nowrap" visibleFrom="sm">
          <Select
            w={120}
            value={searchItem}
            onChange={setSearchItem}
            allowDeselect={false}
            data={columns.filter((item) => item.searchable).map((item) => item.name)}
          />
          <TextInput className={classes.search} placeholder={`Search by ${searchItem}...`} />
        </Group>
        <MultiSelect
          w={150}
          classNames={multiSelectClasses}
          checkIconPosition="right"
          data={columns.map((item) => item.name)}
          placeholder="Columns"
          defaultValue={renderColumns}
          onChange={setRenderColumns}
        />
        <Group>
          <Button
            visibleFrom="sm"
            variant="outline"
            rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.8} />}
          >
            Search
          </Button>
          <UnstyledButton
            onClick={() => {
              const formData = new FormData();
              formData.append('pageSize', pageSize.toString());
              formData.append('pageNum', pageNum.toString());
              fetchData?.('', { method: 'POST', body: formData });
            }}
          >
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
              <TextInput label={item.name} key={item.name} placeholder={item.name} />
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
