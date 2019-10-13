module.exports = {
  parserOptions: {
    ecmaVersion: 9,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    "es6": true,
    "node": true,
  },
  overrides: [
    {
      files: "__tests__/**/*",
      env: {
        jest: true,
      },
    },
  ],
}
