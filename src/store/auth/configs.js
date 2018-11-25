import { STORAGE_KEY_TOKEN } from '../../config';

export const loginConfig = {
  options: ({ history }) => ({
    update: (_, { data: { login } }) => {
      if (login.token) {
        localStorage.setItem(STORAGE_KEY_TOKEN, login.token);
        history.push('/chats'); // ???
      }
    },
  }),
};
