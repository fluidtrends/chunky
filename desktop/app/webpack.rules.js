module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader'
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules'
            }
        }
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }
    },
    {
        test: /\.(png|jpe?g|gif|svg|ico|icns|md)$/i,
        use: [
            {
                loader: 'url-loader'
            }
        ]
    },
    {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader"
            }
        ]
    }
]