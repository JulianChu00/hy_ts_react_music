const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const CracoLessPlugin=require('craco-less')
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options:{
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://codercba.com:9002', // 你的后端地址
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
