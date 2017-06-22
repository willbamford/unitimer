const path = require('path')

const config = {
  entry: {
    main: path.resolve('./lib')
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'unitimer.js',
    library: 'unitimer',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = config
