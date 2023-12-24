import React, { useState } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox } from '@mantine/core';
import { IconMap, IconMapKey } from '../../utils/icon';

export function IconCombobox(props: { value: string, defaultDisabled: boolean }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(props.value);

  const options = Object.keys(IconMap).map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group>
        {IconMap[item as IconMapKey]}
        <Text>{item}</Text>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="图标"
          component="button"
          type="button"
          disabled={props.defaultDisabled}
          pointer
          leftSection={IconMap[value as IconMapKey]}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
