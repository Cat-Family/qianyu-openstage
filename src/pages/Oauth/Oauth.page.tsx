import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import useCountdown from '../../hooks/useCountdown';

const Oauth = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const channel = params.get('channel');
  const authCode = params.get('auth_code') || params.get('code');
  const { fetchData, loading, error, data } = useFetch(true);
  const { startCountdown, counter } = useCountdown(5);

  useEffect(() => {
    if (authCode) {
      fetchData('third/sso/login.action', {
        method: 'POST',
        body: JSON.stringify({
          authCode,
          channel,
        }),
      });
    }
  }, [authCode]);

  useEffect(() => {
    if (data && !error) {
      startCountdown();
    }
  }, [data, error]);

  return (
    <div>
      {loading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <Stack>
          <Text>Login successful</Text>
          <Text>This window will closed by {counter} seconds automatically</Text>
        </Stack>
      )}
    </div>
  );
};

export default Oauth;
