const fs = require('fs')
const path = require('path')
const pkg = require('./package')

// Avoid css files being executed
require.extensions['.css'] = () => {
  return
}

const responsiveJS = fs.readFileSync(path.resolve(__dirname, './plugins/responsive.js'), 'utf8')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { innerHTML: responsiveJS, type: 'text/javascript' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'mand-mobile/lib/mand-mobile.css',
    '@/assets/global.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/responsive', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: [
        '@vue/app'
      ],
      // plugins: [
      //   [
      //     'import',
      //     {
      //       libraryName: 'mand-mobile',
      //       libraryDirectory: 'lib'
      //     }
      //   ]
      // ]
    },
    postcss: {
      plugins: {
        'autoprefixer': {},
        'postcss-pxtorem': {
          'rootValue': 100,
          'minPixelValue': 2,
          'propWhiteList': []
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
