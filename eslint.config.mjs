// eslint.config.mjs
import eslint from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default eslint.defineConfig({
  ignores: ['eslint.config.mjs'],

  parser: tsParser,
  parserOptions: {
    tsconfigRootDir: import.meta.dirname,
    project: ['./tsconfig.json'], // ← point at your tsconfig
  },

  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:prettier/recommended',
  ],

  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: 'commonjs',
  },

  rules: {
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
  },
});
