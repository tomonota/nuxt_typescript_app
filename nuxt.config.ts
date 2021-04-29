// 1. NODE_ENVから環境変数を呼び出す
const environment = process.env.NODE_ENV || 'development'
// 2. envファイルを呼び出す
const envSet = require(`./env/${environment}.js`)

export default {
  ssr: false,

  env: envSet,

  srcDir: 'src/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cr-front-app',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@/assets/sass/reset.sass', lang: 'sass' },
    { src: '@/assets/sass/style.sass', lang: 'sass' },
    { src: '@/assets/sass/variable.sass', lang: 'sass' },
    { src: '@/assets/sass/color.sass', lang: 'sass' },
    { src: '@/assets/sass/margin.sass', lang: 'sass' },
    { src: '@/assets/sass/input.sass', lang: 'sass' },
    { src: '@/assets/sass/content.sass', lang: 'sass' },
    { src: '@/assets/sass/selectbox.sass', lang: 'sass' },
    { src: '@/assets/sass/checkbox.sass', lang: 'sass' },
    { src: '@/assets/sass/radio.sass', lang: 'sass' },
    { src: '@/assets/sass/text.sass', lang: 'sass' }
  ],

  // sassファイルで定義された変数をGlobalにする
  styleResources: {
    sass: [
      '@/assets/sass/variable.sass',
      '@/assets/sass/color.sass',
      '@/assets/sass/button.sass'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/firebase'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
