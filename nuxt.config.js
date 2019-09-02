const fs = require('fs')
const path = require('path')
const pkg = require('./package')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)

const responsiveJS = fs.readFileSync(resolve('./plugins/responsive.js'), 'utf8')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/reset.js' },
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
    }
  }
}
