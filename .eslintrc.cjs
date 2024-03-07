module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "jsx-quotes": ["error", "prefer-double"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "indent": ["error", 2],
    "no-console": ['warn', { allow: ['warn', 'error'] }],
    "quotes": ["error", "single"],
    "semi": ['error', 'always'],
    "no-duplicate-imports": ["error", { "includeExports": true }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-var": "warn",
  },
}
