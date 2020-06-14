const merge = require('webpack-merge')
const BaseWebpackConfig = require('./webpack.base.config.js')

const buildWebpackConfig = merge(BaseWebpackConfig, {
	mode: 'production',
	plugins: []
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
})