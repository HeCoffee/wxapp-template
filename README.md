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

环境变量配置目录

支持 **.env.(js|json)** 后缀文件

开发时通过**process.env**获取环境变量

``` js
// app.js
...
globalData: {
  baseUrl: process.env.BASE_URL
}
```
**若需要增加环境变量以及npm指令参考 npm run dev 或 npm run build进行配置**

## src

开发目录

> app.js中封装了一些方法 和 登录逻辑，不需要可直接删除
>
> wx api promise化，通过app.globalData.wxp访问 fail事件 会直接 throw err

# npm script

``` bash
npm run create-page       # 创建 page

npm run create-component  # 创建 component

npm run dev               # 开发模式 监听src变化 自动构建

npm run build             # 打包构建

npm run lint              # 代码风格检测

npm run fix               # 修复有误代码风格
```
> 开发模式时 src中的文件夹删除或者改名后，建议将dist文件夹清空再run dev或者run build后再run dev

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

> 不习惯某些规则可以在.eslintrc.js中禁用
>
> 引入UI组件时通常会报代码风格错误，将文件夹路径加到.eslintignore中即可忽略检查
>
> 实在不喜eslint 将 webpack配置中的eslint-loader注释即可

# 相关项目

- [wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin)
- [wxapp-boilerplate](https://github.com/cantonjs/wxapp-boilerplate)
- [min-program-webpack](https://github.com/XLinzexin/min-program-webpack)

# 注意事项

1. 第一次构建或者run build指令，部分版本开发者工具不会自动加入`project.config.json`，然后无法运行。

解决方式：开发者工具  详情->本地设置  勾选任意一项再取消即可

2. 部分机型和版本可能出现 `regeneratorRuntime is not defined`的情况

解决方式：开发者工具  详情->本地设置 把**ES6转ES5**和**增强编译**勾上即可

3. 关于引入UI组件 **wxss** 和 **wxs** 问题

有的组件会引入公共wxss，但是less-loader无法识别.wxss文件的引入需要在原来的wxss文件加入标识便于识别，或者改为less文件后缀。建议加入标识解决。

```less
// 原本wxss
@import '../common/index.wxss';

// 添加标识
@import (reference, optional, less) '../common/index.wxss';
@import (css) '../common/index.wxss';
// 若多个文件皆引入同一个文件，那么只要其中一个文件写入这两句，其他文件只要写入@import (css) '**'这句即可
```

> 可参考src/components/vant/lib/button/index.wxss、src/components/vant/lib/icon/index.wxss

部分wxs使用引入公共wxs，同样不被识别，需要将引入的代码写入wxs

```js
// 原wxs
var formate = require('./date.wxs').formate;

module.exports = {
   formate
}

// 改动
function formate (val) {
  return val * 100
};

module.exports = {
   formate
}
```

> 可参考src/components/vant/lib/wxs/utils.wxs

> 持续完善ing......
