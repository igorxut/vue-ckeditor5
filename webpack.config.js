const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      'vue-ckeditor5': path.join(__dirname, 'dist', 'vue-ckeditor5')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'vue-ckeditor5.js',
    library: 'VueCkeditor',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ]
}
