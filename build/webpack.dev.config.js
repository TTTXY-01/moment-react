
const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const utils = require('../build/utils')
// 修改webpack配置的 entry
// baseWebpackConfig.entry = ['./build/dev-client'].concat(baseWebpackConfig.entry)
Object.keys(baseWebpackConfig.entry).forEach(function (item) {
  baseWebpackConfig.entry[item] = ['whatwg-fetch','./build/dev-client'].concat(baseWebpackConfig.entry[item])
})
// 合并base 与dev 的配置
module.exports = merge(baseWebpackConfig, {
    // 在base配置的基础上,添加插件
  plugins: [
    // 在html中引入编译后的资源
    // new HTMLWebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/modules/index/index.html',
    //   excludeChunks:  [
    //     {index : './src/modules/index/about.html'}
    //   ]
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'about.html',
    //   template: './src/modules/about/about.html',
    //   excludeChunks:  [
    //     {index : './src/modules/index/index.html'}
    //   ]
    // }),

        // webpack的默认配置
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
        // webpack的热模块替换插件
    new webpack.HotModuleReplacementPlugin(),
        // webpack 不触发error 事件插件
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

// './src/modules/index/index.js'
// './src/modules/index/index.html'
// './src/modules/about/about.html'
const htmlPaths = utils.getEntries('./src/modules/**/*.html')
// console.log(htmlPaths)
Object.keys(htmlPaths).forEach(function (key) {
  let config = {
    filename: key + '.html',
    template: htmlPaths[key],
    // 忽略其他模块中的js
    excludeChunks: Object.keys(htmlPaths).filter(function (path) {
      return (path !== key)
    })
  }
  const plugin = new HTMLWebpackPlugin(config)
  module.exports.plugins.push(plugin)
})
