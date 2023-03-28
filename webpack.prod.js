const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output:{
    library: 'wc-bubble',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    // filename: '[name].min.js',
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? 'wc-bubble.js' : 'wc-bubble.[name].js';
    }
    // chunkFilename: "[id].js",
  },
  mode: "production",
  devServer: {
    compress: true,
    open: true,
  },
  devtool: "source-map",
  plugins: [],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: __dirname + '/src',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/typescript', '@babel/preset-env'],
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'raw-loader',
          {
            loader:'sass-loader',
            options: {
              sassOptions:{
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          }
        ],
      },
    ],
  },
};
