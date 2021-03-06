module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'import/no-named-as-default': 'off',
    'consistent-return': 'off',
    'no-debugger': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'object-curly-newline': 'warn',
    'react/forbid-prop-types': [0, { forbid: ['object'] }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
  },
};
