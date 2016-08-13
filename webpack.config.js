module.exports = {
  entry: './src/js/index/main',
  output: {
    path: __dirname + '/public/dist/index',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  }
}
