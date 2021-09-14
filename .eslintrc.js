module.exports = {
  extends: 'air-base',
  parserOptions: { ecmaVersion: 11 },
  globals: {
    globalThis: true, // means it's writeable
  },
}
