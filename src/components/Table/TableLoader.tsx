import React from 'react';
import {
  Center,
  Loader,
  TableTd,
  type MantineColor,
  type MantineLoader,
  type MantineSize,
  TableTr,
} from '@mantine/core';
import clsx from 'clsx';

type TableLoaderProps = {
  pt?: number;
  pb?: number;
  loading: boolean | undefined;
  customContent?: React.ReactNode | undefined;
  backgroundBlur?: number | undefined;
  size?: MantineSize | (string & NonNullable<unknown>) | number | undefined;
  type?: MantineLoader | undefined;
  color?: MantineColor | undefined;
  length: number;
};

export function TableLoader({
  pt,
  pb,
  loading,
  customContent,
  backgroundBlur,
  size,
  type,
  color,
  length,
}: TableLoaderProps) {
  return (
    <TableTr
      pt={pt}
      pb={pb}
      style={[{ backdropFilter: backgroundBlur ? `blur(${backgroundBlur}px)` : undefined }]}
    >
      <TableTd colSpan={length + 1}>
        <Center>
          {loading && (customContent || <Loader size={size} type={type} color={color} />)}
        </Center>
      </TableTd>
    </TableTr>
  );
}
