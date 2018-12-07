// TODO: Make this param configurable, using https://www.npmjs.com/package/config

export const API_GQL_HOST = process.env.REACT_API_GQL_HOST || 'http://localhost:3002/graphql';
export const API_WS_GQL_HOST = process.env.REACT_API_WS_GQL_HOST || 'ws://localhost:3002/graphql';
export const STORAGE_KEY_TOKEN = 'DOGECODES_USER_TOKEN';
