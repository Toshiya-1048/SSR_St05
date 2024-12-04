import path from 'path';
import { Configuration } from 'webpack';
import { config } from './src/config';

const webpackConfig: Configuration = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: config.paths.client.slice(1)
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};

export default webpackConfig; 