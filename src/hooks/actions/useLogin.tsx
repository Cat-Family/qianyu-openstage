import { modals } from '@mantine/modals';
import useFetch from '../useFetch';
import { Flex, Text, PinInput, Button } from '@mantine/core';
import { Login } from '../../ts/types/interface/login.interface';
import { useEffect, useState } from 'react';
import { FetchData } from '../../ts/types/types/fetchData.types';

type UseAuthentication = {
  fetchLogin: FetchData
  loading: boolean;
}

const useAuthentication = (): UseAuthentication => {
  const [code, setCode] = useState<string>('');

  const { fetchData: fetchLogin, data: loginData, loading } = useFetch<Login>(false, false, true);

  const { fetchData: twoFALogin, data: twoFARes, loading: towFALoading } = useFetch();

  useEffect(() => {
    loginData?.data?.twoFA &&
      modals.open({
        id: '2FA-modal',
        title: 'Two-factor authentication',
        withCloseButton: false,
        withOverlay: true,
        children: (
          <>
            <Flex justify="center" align="center" direction="column" p="sm" gap="md">
              <Text fw={700} size="xl">
                Authentication code
              </Text>
              <PinInput
                autoFocus
                disabled={towFALoading}
                size="xl"
                length={6}
                type="number"
                aria-label="2FA code"
                placeholder=""
                onComplete={async (e) => {
                  setCode(e);

                  twoFALogin('auth/user/2faLogin.action', {
                    method: 'POST',
                    body: JSON.stringify({
                      code: e,
                    }),
                  });
                }}
              />
              <Text size="sm">
                Open your two-factor authenticator (TOTP) app or browser extension to view your
                authentication code.
              </Text>
              <Button
                fullWidth
                onClick={() => {
                  twoFALogin('auth/user/2faLogin.action', {
                    method: 'POST',
                    body: JSON.stringify({
                      code: code,
                    }),
                  });
                }}
                mt="md"
              >
                Verify
              </Button>
            </Flex>
          </>
        ),
      });
  }, [loginData]);

  return { fetchLogin, loading };
};

export default useAuthentication;
