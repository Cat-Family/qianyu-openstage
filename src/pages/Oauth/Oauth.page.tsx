import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const type_github = import.meta.env.VITE_THIRD_AUTH_TYPE_GITHUB;
const type_alipay = import.meta.env.VITE_THIRD_AUTH_TYPE_ALIPAY;

const Oauth = () => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const channel = params.get("channel");
  let authCode: string | null = "";
  if (type_alipay === channel) {
    authCode = params.get("auth_code")
  } else if (type_github === channel) {
    authCode = params.get("code")
  }

  const { fetchData, data, error } = useFetch(false, false, true);
  useEffect(() => {
    if (authCode) {
      fetchData('third/sso/login.action', {
        method: 'POST',
        body: JSON.stringify({
          authCode,
          channel
        }),
      }).then(r => {});
    }
  }, [authCode]);
  return <div>跳转中...</div>;
};

export default Oauth;
