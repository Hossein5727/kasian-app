const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "/dist"), // the bundle output path
    filename: "main.js",
    publicPath: "/", // the name of the bundle
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {},
};
