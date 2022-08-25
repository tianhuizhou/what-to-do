module.exports = {
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
  },
  publicPath: process.env.BASE_URL || '/',
  lintOnSave: false,

  productionSourceMap: false,

  // filename with hash breaks PWA
  filenameHashing: false,

  pwa: {
    name: 'WhatToDo',
    themeColor: '#3C75A7',
    msTileColor: '#2C2C2C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },

  css: {
    extract: false,

    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },

  chainWebpack(config) {
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        // chunks: 'all',
        cacheGroups: {
          initial_libs: {
            name: 'chunk_libs_initial',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          libs: {
            name: 'chunk_libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 5,
          },
          element_ui: {
            name: 'chunk_element', // split elementUI into a single package
            test: /[\\/]node_modules[\\/]element-ui(.*)/, // in order to adapt to cnpm
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            reuseExistingChunk: true,
          },
          styles: {
            name: 'chunk_styles',
            test: /[\\/]src[\\/]assets[\\/]scss(.*)/,
            priority: 15,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            test: /[\\/]src[\\/]utils[\\/](.*)/,
            priority: 10,
            reuseExistingChunk: true,
          },
          components: {
            name: 'chunk_components',
            test: /[\\/]src[\\/]components[\\/](.*)/,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
    })
  },
}
