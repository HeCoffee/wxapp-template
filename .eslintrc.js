// 忽略文件
/* eslint-disable */
// 忽略指定行
// eslint-disable-line

module.exports = {
  root: true,
  extends: 'standard',
  env: {
    es6: true,
    node: true,
    browser: true
  },
  globals: {
    // 添加全局变量
    App: true,
    Page: true,
    Component: true,
    wx: true,
    my: true,
    getApp: true,
    getDate: true,
    Behavior: true,
    getCurrentPages: true
  },
  rules: {
    // 设置规则开关
    'semi': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'no-prototype-builtins': 0,
    'no-mixed-operators': 0,
    'camelcase': 0,
    'quote-props': 1
  }
}
