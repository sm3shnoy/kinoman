const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  mode: "development",
  devtool: "sourcemap",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
  },
};
