import React, { useState } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox } from '@mantine/core';
import resourceTypeMap, {
  resourceNameOfTypeMap,
} from '../../pages/MenuResource/MenuResourceTypeMap';

export function ResourceTypeCombobox(props: { value: string, defaultDisabled: boolean }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>(props.value);

  const options = [...resourceTypeMap.keys()].map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group>
        {resourceTypeMap.get(item)}
        <Text>{resourceNameOfTypeMap.get(item)}</Text>
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
          disabled={props.defaultDisabled}
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
          {<Text ml={20}>{resourceNameOfTypeMap.get(value)}</Text> || (
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
