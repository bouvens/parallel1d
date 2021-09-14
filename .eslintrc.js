module.exports = {
  extends: 'air-base',
  parserOptions: { ecmaVersion: 11 },
  env: {
    es2020: true,
  },
  globals: {
    globalThis: true, // means it's writeable
  },
}
