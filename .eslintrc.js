module.exports = {
  parserOptions: {
    ecmaVersion: 9,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: '*.test.js',
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/no-test-callback': 'off',
      },
    },
  ],
}
