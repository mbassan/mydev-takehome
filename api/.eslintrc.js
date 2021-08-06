module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "no-console": "off",
    "linebreak-style": "off",
    "no-underscore-dangle": "allow",
    "no-undef": "error",
    quotes: [2, "double"],
  },
};
