/**
 * Created by jonlazarini on 06/03/17.
 */
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

// not generating css file...
const extractSass = new ExtractTextPlugin({
  filename: "[name].[chunkhash].css",
  disable: process.env.NODE_ENV === "development",
  allChunks: true
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

loaders.push({
  include: /\.pug/,
  test: /\.pug/,
  exclude: /(node_modules|bower_components)/,
  use: [
    {loader: 'raw-loader'},
    {loader: 'pug-html-loader'}
  ]
});

// ** old **
// loaders.push({
// 	test: /\.scss$/,
// 	loader: extractSass.extract({
//     use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded',
// 	  fallback: 'style-loader'
// 	}),
// 	exclude: ['node_modules']
// });

module.exports = {
  entry: {
    bundle: './src/index.js', // entry point will be named bundle
    style: './src/sass/main.scss',
    vendors: ['jquery', 'bootstrap']
},
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }],
	module: {
		loaders
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		/*new HtmlWebpackPlugin({
			template: './src/views/index.pug',
			files: {
				style: ['[name].[chunkhash].css'], // will be css.hashkey.css (entry point)
				js: [ '[name].[chunkhash].js'] // will be app.hashkey.js & vendor.hashley.js (entry point)
			}
		}),*/
    // Provides jQuery on global scope can be called using $ or jQuery no need to do scope scope binding
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Bootstrap: 'bootstrap'
    }),
    // creates CSS file
    extractSass,
    // creates additional bundle containing vendors files as an entry
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
    }),
    new ManifestPlugin({
      fileName: 'build-manifest.json'
    })
	]
};
