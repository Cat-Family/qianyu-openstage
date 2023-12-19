import { atom } from 'recoil';

const oauthState = atom({
  key: 'OAuthState', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export { oauthState };
