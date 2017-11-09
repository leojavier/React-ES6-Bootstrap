var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var config = require('./config')
var webpackConfig = require('./webpack.dev.config.js')

var styles
var isProd = process.env.NODE_ENV === 'production' ? true : false

// Toggle Production and Dev styles
if(isProd) {
  styles = webpackConfig.prodStyles 
  //console.log(styles)
}
else {
  styles = webpackConfig.devStyles 
  //console.log(styles)
}

module.exports = {
  entry: {
    bootstrap:'bootstrap-loader',
    about:'./src/js/about'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: config.port,
    open: true
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'assets/images/[name].[ext]'
          } 
      }]
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=../fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=../fonts/[name].[ext]' }
    ]
  },
  plugins: [
    /*new CopyWebpackPlugin([
        { from: 'views' }
    ]),*/
    new CopyWebpackPlugin([
      { 
        from: 'src/assets/images',
        to: 'assets/images'
      }
  ]),
  new CopyWebpackPlugin([
    { 
      from: 'src/assets/fonts',
      to: 'assets/fonts'
    }
]),
    new ExtractTextPlugin({
      filename: "assets/styles/[name].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Account',
      template: 'views/about.html',
      filename: 'about.html',
      chunks:['about']
    }),
   
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      owlcarousel: "owl.carousel",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
}