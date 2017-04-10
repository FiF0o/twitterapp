/**
 * Created by jonlazarini on 06/03/17.
 */
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// loaders.push({
//   rules: [{
// 	  test: /\.scss$/,
//     // loader: ExtractTextPlugin.extract({
//     //   use: [{
//     //     loader: 'style-loader'}, {
//     //     loader: 'css-loader?importLoaders=1'}, {
//     //     loader: 'sass-loader'
//     //   }],
//     //   fallback: "style-loader",
//     //   }),
//     // exclude: ['node_modules']
//     // }],
//     loader: {}
// });

const extractSass = new ExtractTextPlugin({
  filename: "[name].[hash].css",
  allChunks: true
});

loaders.push({
  include: /\.pug/,
  test: /\.pug/,
  exclude: /(node_modules|bower_components)/,
  use: [
    {loader: 'raw-loader'},
    {loader: 'pug-html-loader'}
    ]
});

loaders.push({
  rules: [{
    test: /\.scss$/,
    loader: extractSass.extract({
      use: [{
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }],
      fallback: "style-loader"
    })
  }]
});


module.exports = {
	entry: {
    // 'react-hot-loader/patch',
    bundle: './src/index.js', // your app's entry point
    style: './src/sass/main.scss',
    vendors: ['jquery', 'bootstrap'],
  },
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
  // retrieves external package at runtime - app crashes otherwise
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }],
	module: {
		loaders
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
    // Provides jQuery on global scope
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    extractSass,
    new ManifestPlugin({
      fileName: 'build-manifest.json'
    })
	]
};
