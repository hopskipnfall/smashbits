module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': './tsconfig.json',
        'tsconfigRootDir': __dirname,
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
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
        "object-curly-newline": ["error", {
            "ImportDeclaration": "never",
        }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/lines-between-class-members": "off",
    }
};
