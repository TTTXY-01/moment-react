/**
 * Created by dllo on 17/8/23.
 */
const path = require('path')

module.exports = {
    // 开发环境配置
  dev: {
    env: require('./dev.env'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    port: 5000,
    autoOpenBrowser: true,
    proxyTable: {
      '/api': {
        // http://localhost:5000/api/
        // 转换成如下效果
        // http://pianke.me/
        target: 'http://pianke.me/version5.0',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }

  },
    // 生产环境配置
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '',
    assetsSubDirectory: 'static'
  }
}
