module.exports = (options) => {
  return [{
    fileName: 'webpack.common.js',
    content: `
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', './app/index.tsx'],
    vendor: ['react', 'react-dom'],
  },
  module: {
    rules: [
      {
        test: /\\.(j|t)sx?\$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\\.(sa|sc|c)ss\$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\\.(less)\$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  '@primary': '#2f855a',
                  '@secondary': '#68d391',
                  '@font-color': '#1a202c',
                  '@pc-max-container-width': '800px',
                  '@pc-container-padding': '40px',
                  '@mobile-container-padding': '1.5rem',
                  '@pc-header-height': '60px',
                  '@mobile-header-height': '4rem',
                },
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
      {
        test: /\\.(png|svg|jpg|jpeg|gif)\$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\\.(eot|woff|woff2|ttf|otf)\$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    // clean dir before build
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/images', to: 'assets/images' },
      ],
    }),
    new webpack.ProgressPlugin({ profile: false }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json',
  },
  optimization: {
    // moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      cacheGroups: {
        vendors: {
          test: /[\\\\/]node_modules[\\\\/]/,
          priority: -10,
        },
      },
    },
  },
};

    `,
  }, {
    fileName: 'webpack.dev.js',
    content: `
const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    filename: 'assets/scripts/[name].bundle.js',
    chunkFilename: 'assets/scripts/[name].chunk.js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      eslint: {
        enabled: true,
        files: [
          './app/**/*.{ts,tsx}',
          './src/**/*.{ts,tsx}',
        ],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'views/index.html',
      hash: true,
      inject: false,
      template: './app/views/index.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
      chunkFilename: 'assets/styles/[id].css',
    }),
  ],
});

    `,
  }, {
    fileName: 'webpack.github-page.js',
    content: `
const { merge } = require('webpack-merge');
const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist_github_page'),
    publicPath: '/fe-starter/',
    filename: 'assets/scripts/[name].[chunkhash].js',
    chunkFilename: 'assets/scripts/[name].[chunkhash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[contenthash].css',
      chunkFilename: 'assets/styles/[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      inject: false,
      template: './app/views/github-page/index.ejs',
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      hash: true,
      inject: false,
      template: './app/views/github-page/404.ejs',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});

    `,
  }, {
    fileName: 'webpack.prod.js',
    content: `
const { merge } = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: 'assets/scripts/[name].[chunkhash].js',
    chunkFilename: 'assets/scripts/[name].[chunkhash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[contenthash].css',
      chunkFilename: 'assets/styles/[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'views/index.html',
      hash: true,
      inject: false,
      template: './app/views/index.ejs',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});

    `,
  }];
};
