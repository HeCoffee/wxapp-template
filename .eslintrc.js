module.exports = {
  root: true,
  extends: 'standard',
  env: {
    es6: true,
    node: true,
    browser: true
  },
  globals: {
    App: true,
    Page: true,
    Component: true,
    wx: true,
    my: true,
    getApp: true,
    getCurrentPages: true
  },
  rules: {
    'semi': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0
  }
}
