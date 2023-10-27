import React, { useReducer, useRef } from 'react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { FetchData, FetchDataParams } from '../ts/types/types/fetchData.types';

const BASE_URL: string = '/qy/api/v1/os/';

interface State<T> {
  fetchData: FetchData;
  data?: T;
  error?: Error;
  loading: boolean;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

function useFetch<T extends { code: number; message: string }>(
  showErrorNotification: boolean = true,
  showSuccessNotification: boolean = false,
  showAsyncNotification: boolean = false
): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted

  const initialState: State<T> = {
    fetchData: async () => {},
    error: undefined,
    data: undefined,
    loading: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, loading: true };
      case 'fetched':
        return { ...initialState, loading: false, data: action.payload };
      case 'error':
        return { ...initialState, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async (url: FetchDataParams[0], options: FetchDataParams[1]) => {
    dispatch({ type: 'loading' });

    // If a cache exists for this url, return it
    // if (cache.current[url]) {
    //   dispatch({ type: 'fetched', payload: cache.current[url] })
    //   return
    // }
    let id;
    if (showAsyncNotification) {
      id = notifications.show({
        loading: true,
        title: 'Loading your data',
        message: 'Data will be loaded in 3 seconds, you cannot close this yet',
        autoClose: false,
        withCloseButton: false,
      });
    }

    try {
      const response = await fetch(BASE_URL + url, {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        ...options,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.code !== 200) {
        throw Object({
          name: data.message,
          message: data.data,
        });
      }

      cache.current[url] = data;
      showSuccessNotification &&
        notifications.show({
          withCloseButton: true,
          autoClose: 3000,
          title: '成功',
          message: '操作成功',
          color: 'green',
          icon: <IconCheck />,
          radius: 'lg',
          loading: false,
        });

      showAsyncNotification &&
        notifications.update({
          id,
          color: 'teal',
          title: '成功',
          message: '操作成功',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
          loading: false,
          autoClose: 2000,
        });
      dispatch({ type: 'fetched', payload: data });
    } catch (error: any) {
      notifications.update({
        id,
        color: 'red',
        title: error?.name,
        message: error?.message,
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });

      showErrorNotification &&
        notifications.show({
          withCloseButton: true,
          autoClose: 3000,
          title: error?.name,
          message: error?.message,
          color: 'red',
          icon: <IconX />,
          radius: 'lg',
          loading: false,
        });
      dispatch({ type: 'error', payload: error as Error });
    }
  };

  return { ...state, fetchData };
}

export default useFetch;
