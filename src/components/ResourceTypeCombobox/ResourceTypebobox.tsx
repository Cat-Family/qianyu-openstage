import React, { useState } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox } from '@mantine/core';
import resourceTypeMap, {
  resourceNameOfTypeMap,
} from '../../pages/MenuResource/MenuResourceTypeMap';

export function ResourceTypeCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = [...resourceTypeMap.keys()].map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group>
        {resourceTypeMap.get(item)}
        <Text size="sm">{resourceNameOfTypeMap.get(item)}</Text>
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
          label="资源类型"
          component="button"
          type="button"
          pointer
          leftSectionProps={{ style: { marginLeft: 10 } }}
          leftSection={resourceTypeMap.get(value)}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {<Text size="sm" ml={20}>{resourceNameOfTypeMap.get(value)}</Text> || (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
