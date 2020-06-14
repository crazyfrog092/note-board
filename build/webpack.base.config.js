const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
require('babel-polyfill')

const PATHS = {
	src: path.join(__dirname, '../src'),
	public: path.join(__dirname, '../public'),
	assets: 'assets/'
}

module.exports = {

	externals: {
		paths: PATHS
	},
	entry: {
		app: ['babel-polyfill', PATHS.src]
	},
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.public,
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loader: {
					scss: 'vue-style-loader!css-loader!sass-loader'
				}
			}
		}, {
			test: /\.(png|jpg|gif|svg|jpeg|webp)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.(woff(2)?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.scss$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: { sourceMap: true }
				}, {
					loader: "postcss-loader",
					options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
				}, {
					loader: "sass-loader",
					options: { sourceMap: true }
				}
			]
		}, {
			test: /\.css$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: { sourceMap: true }
				}, {
					loader: "postcss-loader",
					options: { sourceMap: true, config: { path: `./postcss.config.js` } }
				}
			]
		}]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	},
	plugins: [
		new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new HtmlWebpackPlugin({
    	hash: false,
    	template: `${PATHS.src}/index.html`,
    	filename: './index.html'
    }),
    new CopyWebpackPlugin({
    	patterns: [
    		{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
    		{ from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
    		{ from: `${PATHS.src}/static`, to: '' }
    	]
  	})
  ]
}