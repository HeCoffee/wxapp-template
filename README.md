# wxapp template
> 微信小程序 webpack4 模板

### 目录结构
``` bash
.
├── dist    # 打包输出
├── env     # 环境变量
└── src     # 开发
```

### npm script

``` bash
npm run create-page       # 创建page

npm run create-component  # 创建 component

npm run dev               # 开发模式 监听src变化 自动构建

npm run build             # 打包构建

npm run lint              # 代码风格检测

npm run fix               # 修复有误代码风格
```

## 功能

- 支持引用 `node_modules` 模块
- 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
- 使用 `less` 编写 `.wxss` 文件

> 若需要scss 改变loader配置 并且安装依赖包


### 代码风格
- [eslint](https://github.com/eslint/eslint) | [中文文档](https://cn.eslint.org/)
- [standard](https://github.com/feross/standard) | [中文文档](https://standardjs.com/readme-zhcn.html)

## 相关项目
- [wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin)
- [wxapp-boilerplate](https://github.com/cantonjs/wxapp-boilerplate)
- [min-program-webpack](https://github.com/XLinzexin/min-program-webpack)

> 持续完善ing......
