module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true

  },
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jasmine'
  ],
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:jasmine/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
  
    "no-useless-escape": ["warn"],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': ['warn'],
    "@typescript-eslint/no-unused-vars": ["warn", { 'args': 'none', 'caughtErrors': 'all'}],
    "@typescript-eslint/lines-between-class-members": ["error"],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": true, 
        "allowedNames": ["self"]
      }
    ],
    "@typescript-eslint/ban-ts-comment": ["warn"]
  }
};
