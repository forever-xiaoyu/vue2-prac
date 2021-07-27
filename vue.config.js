const path = require('path')
const WebpackBar = require('webpackbar')
// const WorkboxPlugin = require('workbox-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')

const resolvePath = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: resolvePath('deploy/babel'),
  lintOnSave: false,
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件
    extract: true,
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/index.scss";`// 引入样式入口文件
      }
    }
  },

  chainWebpack: config => {
    // 最小化代码
    config.optimization.minimize(true)

    // 代码分割
    config.optimization.splitChunks({
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 300000, // 依赖包超过300000bit将被单独打包
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `chunk.${packageName.replace('@', '')}`
          },
          priority: 10
        }
      }
    })

    // 定义路径别名
    config.resolve.alias
      .set('@', resolvePath('src'))

    // 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
    // 除了 VUE_APP_* 变量之外，在你的应用代码中始终可用的还有两个特殊的变量: 
    //    NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式
    //    BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。
    // 其它的自定义变量需要自行进行如下方式声明
    config.plugin('define').tap(args => {
      args[0]['process.env'].DEMO = JSON.stringify(
        process.env.DEMO
      )
      return args
    })

    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    // 对于不经常改动的库，通过cdn引入
    // 减少代码的大小、也可以减少服务器的带宽，更能把这些文件缓存到客户端，客户端加载的会更快。
    if (isProd) {
      // 通过该配置告诉 webpack 在 javascript 运行环境中已经内置了哪些全局变量，
      // 无需将这些全打包到代码中
      const externals = {
        vue: 'Vue',
      }
      config.externals(externals)

      // 将 cdn 引用注入 htmlWebpackPlugin 中，方便在 index.html 中引入：htmlWebpackPlugin.options.cdn
      const cdn = {
        js: [
        ]
      }
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },

  configureWebpack: config => {
    if (isProd) {
      // 移除代码中的 console 或 debugger 等
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    } else {
      // 根据配置是否启用 vConsole
      config.plugins.push(
        new VConsolePlugin({
          enable: process.env.VUE_APP_VCONSOLE === 'true'
        })
      )

      // 进度条插件
      config.plugins.push(new WebpackBar())
    }

    // 启用 serverWork
    // config.plugins.push(
    //   new WorkboxPlugin.GenerateSW({
    //     // 这些选项帮助 ServiceWorkers 快速启用
    //     // 不允许遗留任何“旧的” ServiceWorkers
    //     clientsClaim: true,
    //     skipWaiting: true
    //   })
    // )
  },

  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    port: 8085, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 自动启动 Vrowser
    disableHostCheck: true, // 防止 127.0.0.1 指向其他域名出现 "Invalid Host header" 错误提示
    /* proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    } */
  }
};
