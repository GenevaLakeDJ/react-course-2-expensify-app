// entry -> output
const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // this devtool shows us exactly where errors, etc. exist in the dev tools (versus showing line 22000 in the compiled bundle.js file)
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // the below tells the dev-server that we are handling routing via client side code, so it should return "this page" (index?) for all 404 routes
        historyApiFallback: true
    }
}

// loader

