const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.PORT || 8887,
    proxy:{
      "/users":{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
      "/adminapi":{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
    },
    open: true,
    compress:true,//压缩
    hot: true
  },
  lintOnSave: false,

})
