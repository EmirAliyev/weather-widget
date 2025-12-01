const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/colors";
          @import "@/assets/styles/mixins/flex";
          @import "@/assets/styles/mixins/typography";
          @import "@/assets/styles/mixins/effects";
        `
      }
    }
  },
  chainWebpack: (config) => {

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)$/);

    config.module.rules.delete('svg');

    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('vue-loader')
        .loader('vue-loader')
        .end()
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  },

  configureWebpack: {
    entry: './src/app/main.ts',
    plugins: [
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'vue/macros': [
              'defineProps',
              'defineEmits',
              'defineModel',
              'withDefaults'
            ]
          }
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      })
    ]
  }
})
