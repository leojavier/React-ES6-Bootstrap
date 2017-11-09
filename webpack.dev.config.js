const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  devStyles : [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        loader: 'postcss-loader'
    }, {
        loader: "sass-loader" // compiles Sass to CSS
    }],
  prodStyles: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    //resolve-url-loader may be chained before sass-loader if necessary
    use: ['css-loader', 'postcss-loader', 'sass-loader']
  })
}