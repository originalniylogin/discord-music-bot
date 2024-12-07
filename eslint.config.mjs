import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import love from 'eslint-config-love';
import prettierPluginRecomended from 'eslint-plugin-prettier/recommended';
import pluginPromise from 'eslint-plugin-promise';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['.adminjs/**', 'node_modules/**', 'eslint.config.mjs', 'orm.config.mjs', 'lint-staged.config.mjs'],
  },
  love,
  prettierPluginRecomended,
  pluginPromise.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.json', 'tsconfig.eslint.json'],
      },
    },
    rules: {
      'prettier/prettier': ['warn'],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
            },
            {
              pattern: '~+(*)/**',
              group: 'internal',
            },
            {
              pattern: '~+(*)',
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'object-curly-spacing': ['warn', 'always'],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/semi': ['off'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/return-await': 'error',
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],

      'import/prefer-default-export': 'off',

      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
    },
  },
  eslintConfigPrettier
);
