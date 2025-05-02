module.exports = {
  root: true,
  parser: 'espree', // Updated parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier'],
  extends: [
    'airbnb',
    'google',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // For React 17+
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
