let path = require("path");
let webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: ["./client/index"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.join(__dirname, "client"),
        exclude: /node_modules/
      },
      {
        test: /\.[s]*css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
