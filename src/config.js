// TODO: Make this param configurable, using https://www.npmjs.com/package/config

export const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000/v1';
export const API_GQL_HOST = process.env.API_GQL_HOST || 'http://localhost:3002/graphql';
export const API_WS_GQL_HOST = process.env.API_WS_GQL_HOST || 'ws://localhost:3002/graphql';
export const WS_API_HOST = process.env.REACT_APP_WS_API_HOST || 'ws://localhost:8000/';
export const STORAGE_KEY_TOKEN = 'DOGECODES_USER_TOKEN';
