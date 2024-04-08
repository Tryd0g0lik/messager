const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// config.output.path = require('path').resolve('./interface/dist');

module.exports = {
  entry: './src/index.ts',
  //   [
  //   'webpack-dev-server/client?http://localhost:3000',
  //   'webpack/hot/only-dev-server',
  //   './app_messager/interface/js/index.ts',
  // ],
  // devtool: 'evel-'
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './main-[id].js',
    publicPath: '/'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },

        ],
        exclude: [
          // path.resolve(__dirname, "../../project"),
          path.resolve(__dirname, "node_modules"),
        ]

      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],

      },
      // {
      //   test: /\.(png|jpe?g)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'img/[name][ext]',
      //   }
      //   // loader: 'file-loader',
      // },
      // {
      //   test: /\.svg$/i,
      //   use: ["@svgr/webpack", "@svgs/*"],
      // }
    ]
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, 'dist')
    ],

    alias: {} // alias
  },

  plugins: [
    new TsconfigPathsPlugin(),
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),
    new Dotenv(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: './public/manifest.json', to: './', },
    //     { from: './public/logo512.png', to: './', },
    //     { from: './public/logo192.png', to: './', },
    //     { from: './src/backend/src', to: './server' }
    //   ],
    // }), template: '../templates/index.html',
    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: './dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: path.resolve(__dirname, 'src/scripts'),

    })
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),

    },

    watchFiles: [
      './src/scripts',

    ],

    compress: true,
    historyApiFallback: true,
    open: true,
    // port: 8080
  },

};
