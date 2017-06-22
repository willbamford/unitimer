module.exports = {
  extends: 'airbnb-base',
  env: { 'browser': true },
  rules: {
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'import/named': 'error',
    'import/default': 'error',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'no-bitwise': 'off',
    'no-shadow': 'off'
  }
}
