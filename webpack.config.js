const path = require('path');

module.exports = {
  entry: {
    demo1: './src/demo1/run.ts',
    demo2: './src/demo2/run.ts',
    // demo3: './src/demo3/run.ts',
  },
  // devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};