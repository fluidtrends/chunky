const path = require('path')
const chunkyDir = path.dirname(path.resolve(require.resolve('react-electron-chunky')))

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
        include: [
            path.resolve(process.cwd(), "chunks"),
            path.resolve(process.cwd(), "desktop"),
            path.resolve(chunkyDir, "app"),
            path.resolve(chunkyDir, "src"),
            path.resolve(chunkyDir, "ui")
        ],
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