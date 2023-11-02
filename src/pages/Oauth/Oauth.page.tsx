import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import useFetch from '../../hooks/useFetch';

const Oauth = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const channel = params.get('channel');
  const authCode = params.get('auth_code') || params.get('code');
  const [counter, setCounter] = useState(5);
  const [startCounter, setStartCounter] = useState(false);

  window.addEventListener('message', (e) => {
    console.log(e.data);
  });

  const { fetchData, loading, error, data } = useFetch(true);
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
      window.parent.postMessage(data, '*');
      setStartCounter(true);
    }
    () => setStartCounter(false);
  }, [data, error]);

  useEffect(() => {
    let counterMutable = counter;
    let timer: NodeJS.Timeout;

    if (startCounter) {
      setInterval(() => {
        counterMutable -= 1;
        counterMutable >= 0 ? setCounter(counterMutable) : window.close();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startCounter, counter]);
  return (
    <div>
      {loading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <Stack>
          <Text>Login sccussfull</Text>
          <Text>This window will closed by {counter} seconds automatically</Text>
        </Stack>
      )}
    </div>
  );
};

export default Oauth;
