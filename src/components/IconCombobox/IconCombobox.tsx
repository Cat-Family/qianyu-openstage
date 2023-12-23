import React, { useState } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox } from '@mantine/core';
import { IconMap, IconMapKey } from '../../utils/icon';

export function IconCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = Object.keys(IconMap).map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group>
        {IconMap[item as IconMapKey]}
        <Text size="sm">{item}</Text>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="图标"
          component="button"
          type="button"
          pointer
          size="sm"
          leftSection={IconMap[value as IconMapKey]}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {<Text size="sm">{value}</Text> || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
