const path = require('path');

//entry -> output 
module.exports = {
  entry: './src/app.js',
  output: {
    //entry path can be relative, but output path must be absolute
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  //webpack loader 
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
};




