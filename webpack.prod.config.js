const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    __dirname + '/src/app.js',
  ],

  output: {
      path: __dirname + '/public/',
      filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
        {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react', 'stage-0'] ,
            plugins: ['transform-decorators-legacy', 'react-hot-loader/babel']
            },
        }
    ]
  }
}
