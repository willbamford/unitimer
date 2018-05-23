module.exports = {
  extends: 'airbnb-base',
  env: { 'browser': true },
  rules: {
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'no-bitwise': 'off',
    'no-shadow': 'off'
  }
}
