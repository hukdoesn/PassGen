const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'lscpu.cn',
      'www.lscpu.cn',
      'localhost',
      '0.0.0.0'  // 用你的实际IP地址替换 x.x
    ]
  }
})
