
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Use the correct path for each hosting platform
  publicPath: process.env.VUE_APP_GITHUB_PAGES === 'true'
    ? '/w14a-vue-axios/'
    : '/'
})
