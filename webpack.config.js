const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',  // Your index.html file
        title: 'J.A.T.E',  // The title of your application
      }),

      new InjectManifest({
        swSrc: './src-sw.js',  // Path to your service worker file
        swDest: 'service-worker.js',  // Where the service worker will be generated
      }),

      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A text editor with offline capabilities!',
        background_color: '#31a9e1',  // Background color for splash screens
        theme_color: '#31a9e1',  // Theme color for the address bar in mobile browsers
        start_url: './',  // Where the app should start when opened
        publicPath: './',  // Path where the manifest and icons will be served from
        display: 'standalone',  // Makes it behave like a native app
        orientation: 'portrait',  // Forces portrait orientation
        fingerprints: false,  // Disable hash in the filename for the manifest
        inject: true,  // Inject the manifest link into HTML
        icons: [
          {
            src: path.resolve('src/images/logo.png'),  // Path to your logo image
            sizes: [96, 128, 192, 256, 384, 512],  // Various sizes for different devices
            destination: path.join('assets', 'icons'),  // Destination folder for icons in the output directory
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],  // For handling CSS files
        },
        {
          test: /\.m?js$/,  // For handling JavaScript files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],  // Transpile modern JS to backward-compatible code
              plugins: ['@babel/plugin-transform-runtime'],  // Ensure async/await and other features work
            },
          },
        },
      ],
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),  // Directory where the app will be served
      hot: true,  // Enable hot module replacement
      open: true,  // Automatically open the browser when the server starts
    },
  };
};

