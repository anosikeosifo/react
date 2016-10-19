module.exports = {
  // devtool: 'eval-source-map',
  entry: __dirname + "/source/App.js",
  output: {
    path: __dirname + "/static/js",
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  devServer: {
    contentBase: './static',
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}
