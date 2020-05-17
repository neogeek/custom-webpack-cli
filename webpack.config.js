const { existsSync } = require('fs');
const { join, resolve } = require('path');

const merge = require('lodash.merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

const config = {
    entry: join(cwd, 'src/js/index.jsx'),
    module: {
        rules: [
            {
                test: /\.tsx?$/u,
                include: [resolve(cwd, 'src/js')],
                loader: resolve(cwd, './node_modules/awesome-typescript-loader')
            },
            {
                test: /\.jsx?$/u,
                include: [resolve(cwd, 'src/js')],
                use: {
                    loader: resolve(cwd, './node_modules/babel-loader'),
                    options: {
                        plugins: [
                            resolve(
                                cwd,
                                './node_modules/babel-plugin-styled-components'
                            )
                        ],
                        presets: [
                            resolve(cwd, './node_modules/@babel/preset-env'),
                            resolve(cwd, './node_modules/@babel/preset-react')
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        compress: true,
        contentBase: resolve(cwd, 'dist'),
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /./u,
                    to: '/'
                }
            ]
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: resolve(cwd, 'public'), to: resolve(cwd, 'dist') }
            ]
        }),
        new HtmlWebpackPlugin({ template: 'public/index.html' })
    ],
    output: {
        filename: 'js/bundle.min.js',
        path: resolve(cwd, 'dist'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            react: resolve(cwd, './node_modules/react'),
            'react-dom': resolve(cwd, './node_modules/react-dom')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        symlinks: false
    }
};

if (process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map';
}

const customWebpackConfigPath = join(cwd, './webpack.custom.js');

if (existsSync(customWebpackConfigPath)) {
    const localWebpackConfig = require(customWebpackConfigPath);

    module.exports = merge(config, localWebpackConfig);
} else {
    console.log(`Custom config not found at ${customWebpackConfigPath}`);

    module.exports = config;
}
