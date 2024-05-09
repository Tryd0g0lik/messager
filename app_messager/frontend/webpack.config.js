const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CopyPlugin = require("copy-webpack-plugin");
// config.output.path = require('path').resolve('./interface/dist');

module.exports = {
  entry: './src/index.ts',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: 'main-[id]-[hash].js',
    publicPath: '/',
    clean: true,

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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',

        ],

      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        generator: {
          // filename: '../pic/[hash][ext]'
        },
        use: [
          'svgo-loader',
          // 'svg-transform-loader'
        ]
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '../pic/[name][ext]',
      //   },
      // },

    ]
  },



  plugins: [
    new TsconfigPathsPlugin(),
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),
    new Dotenv(),
    new SpriteLoaderPlugin({

    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: './src/pic', to: '../pic', }
    //   ],
    // }), // template: '../templates/index.html',
    new HtmlWebpackPlugin({
      template: '../templates/index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: './dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: path.resolve(__dirname, 'src/scripts'),

    }),
    new MiniCssExtractPlugin({
      filename: '../css/style.css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../static'),

    },

    watchFiles: [
      './src/scripts',
    ],

    compress: true,
    historyApiFallback: true,
    open: true,
    // port: 8080
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "dist")
    ],

    alias: {
      '@Websocket': path.resolve(__dirname, "src/scripts/websockets/index.ts"),
      "@Interfaces": path.resolve(__dirname, "src/interface.ts"),
      "@htmlTemplates": path.resolve(__dirname, "src/scripts/templates"),
      "@Service": path.resolve(__dirname, "src/scripts/chat"),
    }
  },

};
