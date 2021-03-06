const { resolve } = require('path')
const fs = require('fs')

const {
  DefinePlugin
} = require('webpack')

const { Targets } = require('wxapp-webpack4-plugin')
// const WXAppWebpackPlugin = require('wxapp-webpack4-plugin').default
// wxapp-webpack4-plugin 不支持部分功能，如：全局components custom-tab-bar 所以在其基础上修改了部分代码
const WXAppWebpackPlugin = require('./webpack-plugin/wxapp-webpack4-plugin-myself').default

const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const srcDir = resolve('src')

// 引入环境常量 支持 js/json
const envFiles = fs.readdirSync('./env')
const envFileType = /\.env\.(js|json)$/i
const envObj = {}

envFiles.forEach((fileName) => {
  if (!envFileType.test(fileName)) return false
  const key = fileName.split(envFileType)[0]
  envObj[key] = require(`./env/${fileName}`)
})

const relativeFileLoader = (ext = '[ext]', esModule = false) => {
  return {
    loader: 'file-loader',
    options: {
      esModule,
      useRelativePath: false,
      name: `[path][name].${ext}`,
      context: srcDir
    }
  }
}

module.exports = (env) => {
  const isDev = env !== 'prod';
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: resolve('dist')
    },
    target: Targets.Wechat,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader',
            'source-map-loader'
          ]
        },
        // wxs 需要转换所有es15
        {
          test: /\.wxs$/,
          include: /src/,
          exclude: /node_modules/,
          use: [
            relativeFileLoader('wxs'),
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['@babel/preset-env']
              }
            },
            'eslint-loader'
          ]
        },
        {
          test: /\.(less|wxss)$/,
          include: /src/,
          use: [
            relativeFileLoader('wxss'),
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|json$)$/,
          include: /src/,
          type: 'javascript/auto',
          use: [
            relativeFileLoader()
          ]
        },
        {
          test: /\.wxml$/,
          include: /src/,
          use: [
            relativeFileLoader('wxml'),
            {
              loader: 'wxml-loader',
              options: {
                root: srcDir,
                enforceRelativePath: true
              }
            }
          ]
        }
        // 全page添加全局组件
        // {
        //   test: /\.(wxml|axml)$/,
        //   include: /src\/pages/,
        //   use: [
        //     {
        //       loader: resolve('webpack-plugin/add-wxml-loader.js'),
        //       options: {
        //         wxml: '<global-component id="globalComponent"/>',
        //       },
        //     },
        //   ],
        // },
      ]
    },
    plugins: [
      new DefinePlugin({
        'process.env': JSON.stringify(envObj[env])
      }),
      new WXAppWebpackPlugin({
        clear: !isDev
      }),
      // 将src中images文件夹整个复制
      new CopyPlugin({
        patterns: [
          {
            from: 'images',
            to: 'images',
            context: srcDir
          },
          {
            from: 'sitemap.json',
            to: 'sitemap.json',
            context: srcDir
          }
        ]
      })
    ],
    devtool: isDev ? 'source-map' : false,
    resolve: {
      alias: {
        '@': resolve('src')
      },
      modules: [resolve(__dirname, 'src'), 'node_modules']
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i
        })
      ]
    },
    watchOptions: {
      poll: 1000, // 监测修改的时间(ms)
      ignored: /dist|node_modules/,
      aggregateTimeout: 300
    }
  }
}
