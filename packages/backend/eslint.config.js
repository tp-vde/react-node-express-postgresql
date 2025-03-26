const tsEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const nodePlugin = require('eslint-plugin-node');
const globals = require('globals');

module.exports = [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      node: nodePlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'deprecation/deprecation': 'off',
      'no-shadow': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ]
      // '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
];