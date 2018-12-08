// eslint-disable-next-line import/no-extraneous-dependencies
const { compose } = require('react-app-rewired');
const eslint = require('react-app-rewire-eslint');
// eslint-disable-next-line import/no-extraneous-dependencies
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const polyfills = require('react-app-rewire-polyfills');

module.exports = {
  webpack(cfg, env) {
    console.log('ENV VARS', process.env);
    const config = rewireDefinePlugin(cfg, env, {
      'process.env.REACT_API_GQL_HOST': JSON.stringify(process.env.REACT_API_GQL_HOST || 'http://localhost:3002/'),
      'process.env.REACT_API_WS_GQL_HOST': JSON.stringify(process.env.REACT_API_WS_GQL_HOST || 'ws://localhost:3002/'),
    });
    return compose(
      eslint,
      polyfills,
    )(config, env);
  },
};
