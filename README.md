# wxapp template

> 微信小程序 webpack4 模板

# 目录结构

``` bash
.
├── dist    # 打包输出
├── env     # 环境变量
└── src     # 开发
```

## dist

开发者工具导入项目目录

> dev/build后生成该目录

## env

环境变量配置目录 支持**.env.(js|json)**后缀文件
开发时通过**process.env**获取环境变量

``` js
// app.js
...
globalData: {
    httpUrl: process.env.BASE_API
}
```
**若需要增加环境变量以及npm指令参考 npm run dev 或 npm run build进行配置**

# npm script

``` bash
npm run create-page       # 创建 page

npm run create-component  # 创建 component

npm run dev               # 开发模式 监听src变化 自动构建

npm run build             # 打包构建

npm run lint              # 代码风格检测

npm run fix               # 修复有误代码风格
```

# 功能

- 支持引用 `node_modules` 模块
- 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
- 使用 `less` 编写 `.wxss` 文件
- 支持 [custom-tab-bar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) 、[插件](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/)

> 若需要scss 改变loader配置 并且安装依赖包

# UI组件引用

### 推荐UI组件库

- [Vant Weapp](https://github.com/youzan/vant-weapp)
- [Wux Weapp](https://github.com/wux-weapp/wux-weapp)
- [WeUI](https://github.com/wechat-miniprogram/weui-miniprogram)

###  引用方式：

1. 到UI库的GitHub地址上下载已构建好的components按需放到src的components文件夹。如:Vant、Wux
2. 到UI库的GitHub地址上下载项目，本地构建components再按需放到src的components文件夹中。如:WeUI

**注意json文件配置**

***不支持直接npm的安装方式***

# 代码风格

- [eslint](https://github.com/eslint/eslint) | [中文文档](https://cn.eslint.org/)
- [standard](https://github.com/feross/standard) | [中文文档](https://standardjs.com/readme-zhcn.html)

# 相关项目

- [wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin)
- [wxapp-boilerplate](https://github.com/cantonjs/wxapp-boilerplate)
- [min-program-webpack](https://github.com/XLinzexin/min-program-webpack)

> 持续完善ing......
