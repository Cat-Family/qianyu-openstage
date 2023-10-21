import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Oauth = () => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const authCode = params.get('auth_code');
  const scope = params.get('scope');

  const { fetchData, data, error } = useFetch(false, false, true);
  useEffect(() => {
    if (authCode && scope) {
      fetchData('third/auth/zfb/login.action', {
        method: 'POST',
        body: JSON.stringify({
          authCode,
          scope,
        }),
      });
    }
  }, [authCode, scope]);
  return <div>test</div>;
};

export default Oauth;
