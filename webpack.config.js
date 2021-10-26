const { existsSync } = require('fs');
const { join, resolve } = require('path');

const merge = require('lodash.merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildInfoPlugin = require('build-info-webpack-plugin');

const cwd = process.cwd();

const node_modules = resolve(cwd, 'node_modules');

const reactMajorVersion = require(resolve(node_modules, 'react/package.json'))
    .version.toString()
    .split('.')[0];

const config = {
    entry: join(cwd, 'src/js/index.jsx'),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                include: /.*/,
                exclude: /node_modules/u,
                use: [
                    resolve(node_modules, 'style-loader'),
                    resolve(node_modules, 'css-loader'),
                    resolve(node_modules, 'sass-loader')
                ]
            },
            {
                test: /\.tsx?$/u,
                include: /.*/,
                exclude: /node_modules/u,
                loader: resolve(node_modules, 'ts-loader')
            },
            {
                test: /\.jsx?$/u,
                include: /.*/,
                exclude: /node_modules/u,
                use: {
                    loader: resolve(node_modules, 'babel-loader'),
                    options: {
                        plugins: [
                            resolve(
                                node_modules,
                                'babel-plugin-styled-components'
                            )
                        ],
                        presets: [
                            resolve(node_modules, '@babel/preset-env'),
                            [
                                resolve(node_modules, '@babel/preset-react'),
                                {
                                    runtime:
                                        reactMajorVersion >= 17
                                            ? 'automatic'
                                            : 'classic'
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: resolve(node_modules, 'file-loader')
                    }
                ]
            }
        ]
    },
    devServer: {
        compress: true,
        static: {
            directory: resolve(cwd, 'dist')
        },
        allowedHosts: 'all',
        historyApiFallback: {
            rewrites: [
                {
                    from: /./u,
                    to: '/'
                }
            ]
        },
        open: true
    },
    plugins: [
        BuildInfoPlugin,
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(cwd, 'public'),
                    to: resolve(cwd, 'dist'),
                    noErrorOnMissing: true
                }
            ]
        }),
        new HtmlWebpackPlugin(
            existsSync(resolve(cwd, 'src/index.html')) && {
                template: resolve(cwd, 'src/index.html')
            }
        )
    ],
    output: {
        filename: 'js/bundle.min.js',
        path: resolve(cwd, 'dist'),
        publicPath: '/'
    },
    performance: { hints: false },
    resolve: {
        alias: {
            react: resolve(cwd, './node_modules/react'),
            'react-dom': resolve(cwd, './node_modules/react-dom')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.sass', '.scss'],
        symlinks: false
    }
};

module.exports = (_, { mode }) => {
    if (mode === 'development') {
        config.devtool = 'source-map';
    }

    const customWebpackConfigPath = join(cwd, './webpack.custom.js');

    if (existsSync(customWebpackConfigPath)) {
        const localWebpackConfig = require(customWebpackConfigPath);

        return merge(config, localWebpackConfig);
    } else {
        console.log(`Custom config not found at ${customWebpackConfigPath}`);

        return config;
    }
};
