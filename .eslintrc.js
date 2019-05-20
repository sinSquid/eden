module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
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
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    $: true,
    _: true,
  },
};
