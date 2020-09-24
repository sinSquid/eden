module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // state赋值
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        // for vuex state
        'state',
        // for e.returnvalue
        'e',
      ],
    }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'import/no-cycle': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
        modules: true,
        experimentalObjectRestSpread: true,
      },
    },
  },
  globals: {
    $: true,
    _: true,
    Big: true,
  },
};
