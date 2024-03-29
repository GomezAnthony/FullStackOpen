module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
  },
};
