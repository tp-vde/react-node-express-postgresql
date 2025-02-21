import eslint from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      },
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        window: "readonly",
        document: "readonly",
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        HTMLElement: "readonly",
        webpack: "readonly",
        // console: "readonly"
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      'react-hooks': reactHooksPlugin,
      react: reactPlugin
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'no-undef': 'off'
      // "@typescript-eslint/no-explicit-any": "error"
    },
    settings: {
      env: ['browser'],
      react: {
        version: 'detect',
      },
    },
  }
];
