/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-svelte'],
  singleQuote: true,
  proseWrap: 'always',
  printWidth: 120,
  semi: false,
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: '**/*.svx',
      options: {
        parser: 'markdown',
      },
    },
  ],
}

module.exports = config
