const webpack = require('webpack')
const merge = require('webpack-merge')
const BaseWebpackConfig = require('./webpack.base.config.js')

const devWebpackConfig = merge(BaseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: BaseWebpackConfig.externals.paths.public,
		port: 8081,
		overlay: {
			warning: true,
			errors: true
		}
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig)
})