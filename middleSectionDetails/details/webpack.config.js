const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      // }
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src', 'dist'),
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
}

// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const combineLoaders = require('webpack-combine-loaders');

// module.exports = {
//   entry: './src/index.jsx',
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: [ '@babel/react' ]
//             }
//           }  
//         ],
//       },
//       {
//         // test: /\.css$/
//         loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]"),
//       }
//     ],
//   },
//   plugins: [
//     new ExtractTextPlugin('styles.css'),
//   ]
// }

