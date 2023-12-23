import React, { FC, ReactElement } from 'react';
import {
  Center,
  Group,
  Indicator,
  TableTh,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  rem,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconQuestionMark,
  IconSelector,
} from '@tabler/icons-react';
import classes from './Table.module.css';

interface ThProps {
  children: React.ReactNode;
  tooltip?: string | ReactElement;
  reversed?: boolean;
  width?: string | number;
  sortable: boolean;
  onSort?(): void;
  isSortable?: boolean;
}

const TableHeaderCell: FC<ThProps> = ({
  children,
  reversed,
  sortable,
  onSort,
  isSortable,
  width,
  tooltip,
}) => {
  const Icon = sortable ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <TableTh w={width}>
      {isSortable ? (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group justify="space-between" wrap="nowrap">
            <Text className={classes.text} fw={500} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      ) : (
        <Indicator
          color="none"
          disabled={tooltip == null}
          label={
            <Tooltip
              label={tooltip}
              color="blue"
              position="right"
              arrowPosition="side"
              arrowSize={5}
              withArrow
            >
              <ThemeIcon radius="xl" size="13" style={{ marginLeft: '-13.5rem', marginTop: '1.2rem' }}>
                <IconQuestionMark />
              </ThemeIcon>
            </Tooltip>
          }
        >
          <Text className={classes.text} fw={500} fz="sm">
            {children}
          </Text>
        </Indicator>
      )}
    </TableTh>
  );
};

export { TableHeaderCell };
