module.exports = {
	entry: './js/main.js',
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		inline: true, // auto reload
		port: 8000,
		host: '192.168.1.105' // to access with mobile
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: /js/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{ 
				test: /\.css$/,
				include: /css/,
				loader: "style-loader!css-loader" 
			}
		]
	}
}
