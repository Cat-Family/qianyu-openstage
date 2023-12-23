import React, { ReactElement, useRef, useState } from 'react';
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
import { useDisclosure, useInputState } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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

type FormType = {
  [key: string]: string;
};

function TableSearch<T>({
  columns,
  renderColumns,
  setRenderColumns,
  fetchData,
  pageSize,
  pageNum,
}: TableSearchProps<T>) {
  const [searchItem, setSearchItem] = useState(columns.filter((item) => item.searchable)[0]);
  const [value, setValue] = useInputState('');
  const [opened, { open, close }] = useDisclosure(false);
  const formRef = useRef(null);

  const form = useForm<FormType>({
    initialValues: columns
      .filter((item) => item.searchable)
      .reduce((acc: FormType, current) => {
        acc[current.uid as string] = '';
        return acc;
      }, {}),
  });

  return (
    <>
      <Flex wrap="wrap" gap="md" justify="center">
        <Group wrap="nowrap" visibleFrom="sm">
          <Select
            w={120}
            value={searchItem.name}
            onChange={(val) => {
              setSearchItem(columns.filter((item) => item.name === val)[0]);
              setValue('');
            }}
            allowDeselect={false}
            data={columns.filter((item) => item.searchable).map((item) => item.name)}
          />
          <TextInput
            className={classes.search}
            placeholder={`Search by ${searchItem.name}...`}
            value={value}
            onChange={setValue}
          />
        </Group>
        <Group>
          <Button
            visibleFrom="sm"
            variant="outline"
            onClick={() => {
              const formData = new FormData();
              formData.append(searchItem.uid.toString(), value);
              formData.append('pageSize', pageSize.toString());
              formData.append('pageNum', pageNum.toString());
              fetchData?.('', { method: 'POST', body: formData });
            }}
            rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.8} />}
          >
            Search
          </Button>
          <MultiSelect
            w={150}
            classNames={multiSelectClasses}
            checkIconPosition="right"
            data={columns.map((item) => item.name)}
            placeholder="Columns"
            defaultValue={renderColumns}
            onChange={setRenderColumns}
          />
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
        <form
          className={classes.form}
          ref={formRef}
          onSubmit={form.onSubmit((data) => {
            if (!formRef.current) {
              return;
            }
            const formData = new FormData();
            const keys = Object.keys(data);
            keys.map((key) => formData.append(key, data[key]));

            fetchData?.('', { method: 'POST', body: formData });
          })}
        >
          {columns
            .filter((item) => item.searchable)
            .map((item) => (
              <TextInput
                label={item.name}
                key={item.uid.toString()}
                placeholder={item.name}
                {...form.getInputProps(item.uid.toString())}
              />
            ))}
          <Group style={{ alignSelf: 'end' }}>
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
                const formData = new FormData();
                formData.append('pageSize', pageSize.toString());
                formData.append('pageNum', pageNum.toString());
                fetchData?.('', { method: 'POST', body: formData });
              }}
            >
              Reset
            </Button>
            <Button type="submit" rightSection={<IconArrowRight size={14} />}>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export { TableSearch };
