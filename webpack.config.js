const { existsSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');

const merge = require('lodash.merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildInfoPlugin = require('build-info-webpack-plugin');

const cwd = process.cwd();

const nodeModules = resolve(cwd, 'node_modules');

const localNodeModules = resolve(__dirname, 'node_modules');

const resolveNodeModule = name => {
    if (existsSync(join(nodeModules, name))) {
        return resolve(nodeModules, name);
    } else if (existsSync(join(localNodeModules, name))) {
        return resolve(localNodeModules, name);
    }

    throw new Error(`Can't locate ${name} module.`);
};

const reactMajorVersion = require(resolve(nodeModules, 'react/package.json'))
    .version.toString()
    .split('.')[0];

const entryJavaScriptFile = join(cwd, 'src/js/index.jsx');
const entryTypeScriptFile = join(cwd, 'src/js/index.tsx');

const tsconfigPath = join(cwd, 'tsconfig.json');

if (existsSync(entryTypeScriptFile) && !existsSync(tsconfigPath)) {
    writeFileSync(
        tsconfigPath,
        JSON.stringify(
            {
                compilerOptions: {
                    esModuleInterop: true,
                    forceConsistentCasingInFileNames: true,
                    moduleResolution: 'node',
                    skipLibCheck: true,
                    strict: true,
                    jsx: 'react-jsx',
                    module: 'esnext',
                    target: 'es6'
                },
                include: ['./src'],
                exclude: ['node_modules']
            },
            null,
            2
        )
    );
}

const config = {
    entry: existsSync(entryJavaScriptFile)
        ? entryJavaScriptFile
        : existsSync(entryTypeScriptFile)
        ? entryTypeScriptFile
        : null,
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                include: /.*/,
                exclude: /node_modules/u,
                use: [
                    resolveNodeModule('style-loader'),
                    resolveNodeModule('css-loader'),
                    resolveNodeModule('sass-loader')
                ]
            },
            {
                test: /\.tsx?$/u,
                include: /.*/,
                exclude: /node_modules/u,
                loader: resolveNodeModule('ts-loader')
            },
            {
                test: /\.jsx?$/u,
                include: /.*/,
                exclude: /node_modules/u,
                use: {
                    loader: resolveNodeModule('babel-loader'),
                    options: {
                        plugins: [
                            resolveNodeModule('babel-plugin-styled-components')
                        ],
                        presets: [
                            resolveNodeModule('@babel/preset-env'),
                            [
                                resolveNodeModule('@babel/preset-react'),
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
                        loader: resolveNodeModule('file-loader')
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
        existsSync(resolve(cwd, 'src/index.html'))
            ? new HtmlWebpackPlugin({
                  template: resolve(cwd, 'src/index.html')
              })
            : new HtmlWebpackPlugin()
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
