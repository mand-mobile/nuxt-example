const fs = require('fs')
const path = require('path')
const pkg = require('./package')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

// Avoid css files being executed
require.extensions['.css'] = () => {
  return
}

const resolve = file => path.resolve(__dirname, file)

const responsiveJS = fs.readFileSync(resolve('./plugins/responsive.js'), 'utf8')

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
      plugins: [
        [
          'import',
          {
            libraryName: 'mand-mobile',
            libraryDirectory: 'components'
          }
        ]
      ]
    },
    transpile: [
      'mand-mobile'
    ],
    loaders: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 3
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./assets/theme.custom')
        ]
      },
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
