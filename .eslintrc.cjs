module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'build'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'jsx-a11y',
    'react-refresh'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx']
      }
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};