import React, { ReactElement } from 'react';
import cx from 'clsx';
import { Checkbox, Table as MantineTable, TableTd, ThemeIcon, Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import classes from './Table.module.css';
import { TableHeaderCell } from './TableHeaderCell';

interface ThProps<T> {
    toggleAll: () => void;
    columns: {
        name: string;
        sortable?: boolean;
        searchable?: boolean;
        defaultShow?: boolean;
        width?: string | number;
        uid: keyof T;
        render?: (item: T) => ReactElement | void;
    }[];
    data: T[] | undefined;
    scrolled: boolean;
    selection: string[];
    renderColumns: string[];
    sortBy: keyof T | null;
    reverseSortDirection: boolean;
    setSorting: (field: keyof T) => void;
    noSelector?: boolean;
    expansion?: any;
}

function TableHeader<T>({
                            toggleAll,
                            data,
                            columns,
                            scrolled,
                            selection,
                            renderColumns,
                            sortBy,
                            reverseSortDirection,
                            setSorting,
                            noSelector,
                            expansion,
                        }: ThProps<T>) {
    return (
        <MantineTable.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <MantineTable.Tr key="head">
                <TableTd w={40} />
                {!noSelector && (
                    <TableTd key="check">
                        <Checkbox
                          onChange={toggleAll}
                          checked={selection.length === data?.length}
                          indeterminate={selection.length > 0 && selection.length !== data?.length}
                        />
                    </TableTd>
                )}
                {columns.map(
                    (item, index) =>
                        renderColumns.includes(item.name) && (
                            <TableHeaderCell
                              key={index}
                              width={item.width}
                              isSortable={item.sortable}
                              sortable={sortBy === item.uid}
                              reversed={reverseSortDirection}
                              onSort={() => setSorting(item.uid)}
                            >
                                {item.name}
                                <Tooltip
                                  label="Tooltip"
                                  color="blue"
                                  position="right"
                                  arrowPosition="side"
                                  arrowSize={5}
                                  withArrow
                                >
                                    <ThemeIcon
                                      radius="xl"
                                      size="13"
                                      style={{ marginLeft: '0.4rem' }}
                                    >
                                        <IconQuestionMark />
                                    </ThemeIcon>
                                </Tooltip>
                            </TableHeaderCell>
                        )
                )}
            </MantineTable.Tr>
        </MantineTable.Thead>
    );
}

export { TableHeader };
