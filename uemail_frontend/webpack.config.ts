import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

let production: webpack.Configuration | undefined;
let development: webpack.Configuration | undefined;

if (process.env.NODE_ENV === 'production') {
  production = {
    mode: 'production',
    entry: [
      path.resolve(__dirname, './src/index')
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: {
              inline: false
            }
          }
        })
      ],
    },
    module: {
      rules: [
        {test: /\.tsx?$/, include: path.join(__dirname, 'src'), loader: 'ts-loader'},
        {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
        {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    target: 'web'
  };
} else {
  development = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, './src/index')
    ],
    module: {
      rules: [
        {test: /\.tsx?$/, include: path.join(__dirname, 'src'), loader: 'ts-loader'},
        {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
        {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    target: 'web'
  };
}

const config: webpack.Configuration = production || development!;

export default config;
