/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    // Remove after https://github.com/sveltejs/eslint-plugin-svelte/issues/348 is resolved
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$',
      },
    ],
  },
  globals: {
    // Remove after https://github.com/sveltejs/eslint-plugin-svelte/issues/348 is resolved
    $$Generic: 'readonly',
    tailwindcss: 'readonly',
  },
}

module.exports = config
