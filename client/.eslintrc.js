module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript/base',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'unicorn', 'import', 'react'],
  rules: {
    'linebreak-style': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'react/prop-types': 'off',
    'func-names': 'off',
    'prefer-arrow-callback': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-pascal-case': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    quotes: ['error', 'single'],

    // Possibly temporary adjustments to help us ease into using eslint.
    'unicorn/filename-case': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          '{}': {
            message: '// TODO(jonnjonn): Somehow allow this for only our Parameters objects',
            fixWith: 'object',
          },
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'max-classes-per-file': 'off',
    'no-param-reassign': 'warn',
    quotes: 'off', // Use prettier instead.
    'unicorn/prefer-spread': 'off',
  },
};
