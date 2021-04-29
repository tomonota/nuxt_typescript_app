module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'no-console': 0,
    'import/named': 0,
    'vue/multi-word-component-names': 'off'
  }
}
