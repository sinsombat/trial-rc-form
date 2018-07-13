const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const antdTheme = require('../src/theme') // <- Include variables to override antd theme

const extractLess = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development', // disable this during development
})

module.exports = (config, webpack) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [['import', { libraryName: 'antd', style: true }]],
          },
        },
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: antdTheme
            }
          }]
        }
      ],
    },
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.BROWSER': JSON.stringify(false)
      }),
      extractLess, // <- Add the ExtractTextPlugin instance here
    ],
  }
}
