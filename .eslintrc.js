module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2017: true,
  },
  extends: [
    'airbnb-typescript',
    'prettier', // Prettier modules must go last.
    'prettier/unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: [
      './tsconfig.base.json',
      './client/tsconfig.json',
      './server/tsconfig.json',
    ],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'unicorn', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'off', // Broken for type imports...
    '@typescript-eslint/no-unused-vars': 'warn',
    // Let the compiler decide instead. Maybe we can change this in the future.
    'import/no-cycle': 'off',
    // TODO: Enable this and clean up the code.
    '@typescript-eslint/no-use-before-define': 'warn',
    'import/no-extraneous-dependencies': 'warn', // This doesn't always seem correct.
  },
  ignorePatterns: [
    'client/node_modules',
    'client/.build',
    'client/dist',
    'server/node_modules',
    'server/.build',
    'server/dist',
  ],
};
