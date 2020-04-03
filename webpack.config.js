const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

const config = {
    'entry': path.join(
        cwd,
        'src/js/index.jsx'
    ),
    'module': {
        'rules': [
            {
                'test': /\.tsx?$/u,
                'include': [
                    path.resolve(
                        cwd,
                        'src/js'
                    )
                ],
                'loader': path.resolve(
                    cwd,
                    './node_modules/awesome-typescript-loader'
                )
            },
            {
                'test': /\.(?:js|jsx)$/u,
                'include': [
                    path.resolve(
                        cwd,
                        'src/js'
                    )
                ],
                'use': {
                    'loader': path.resolve(
                        cwd,
                        './node_modules/babel-loader'
                    ),
                    'options': {
                        'plugins': [
                            path.resolve(
                                cwd,
                                './node_modules/babel-plugin-styled-components'
                            )
                        ],
                        'presets': [
                            path.resolve(
                                cwd,
                                './node_modules/@babel/preset-env'
                            ),
                            path.resolve(
                                cwd,
                                './node_modules/@babel/preset-react'
                            )
                        ]
                    }
                }
            }
        ]
    },
    'devServer': {
        'contentBase': path.resolve(
            cwd,
            'dist'
        )
    },
    'plugins': [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                'from': path.resolve(
                    cwd,
                    'public'
                ),
                'to': path.resolve(
                    cwd,
                    'dist'
                )
            }
        ]),
        new HtmlWebpackPlugin({'template': 'public/index.html'})
    ],
    'output': {
        'filename': 'js/bundle.min.js',
        'path': path.resolve(
            cwd,
            'dist'
        ),
        'publicPath': '/'
    },
    'resolve': {
        'alias': {
            'react': path.resolve(
                cwd,
                './node_modules/react'
            ),
            'react-dom': path.resolve(
                cwd,
                './node_modules/react-dom'
            )
        },
        'extensions': [
            '.ts',
            '.tsx',
            '.js',
            '.jsx'
        ],
        'symlinks': false
    }
};

if (process.env.NODE_ENV === 'development') {

    config.devtool = 'source-map';

}

module.exports = config;
