// entry -> output
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        // this devtool shows us exactly where errors, etc. exist in the dev tools (versus showing line 22000 in the compiled bundle.js file)
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public', ),
            // the below tells the dev-server that we are handling routing via client side code, so it should return "this page" (index?) for all 404 routes
            historyApiFallback: true,
            publicPath: './dist/'
        }
    }
}


