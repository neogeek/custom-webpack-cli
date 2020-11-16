# @neogeek/custom-webpack-cli

> 🎒 A no-frill webpack cli that requires next to nothing to get started.

[![NPM Version](http://img.shields.io/npm/v/@neogeek/custom-webpack-cli.svg?style=flat)](https://www.npmjs.org/package/@neogeek/custom-webpack-cli)

## Features

-   React 17
-   TypeScript 4
-   Styled Components
-   Sass

## Install

```bash
$ npm install @neogeek/custom-webpack-cli --save-dev
```

## Usage

**package.json**

```json
{
    "dependencies": {
        "react": "17.0.1",
        "react-dom": "17.0.1",
        "styled-components": "5.2.1"
    },
    "devDependencies": {
        "@neogeek/custom-webpack-cli": "2.7.0"
    },
    "scripts": {
        "start": "custom-webpack-dev-server-cli --port 5000",
        "build": "custom-webpack-cli"
    }
}
```

**src/js/index.jsx**

```javascript
import ReactDOM from 'react-dom';

const HelloMessage = ({ name }) => <div>Hello {name}</div>;

ReactDOM.render(<HelloMessage name="Taylor" />, document.querySelector('body'));
```

## Static Files

All static files (images, audio, video files) should be placed in a folder names `public/` at the root of the project.

## Customization

To customize the webpack config, add a `webpack.custom.js` to the root of your project. The contents of that file will be merged with the [webpack.config.js](webpack.config.js) file distributed with this tool.

**webpack.custom.js**

```javascript
const config = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules\/(?!custom-component-library)/u,
                include: /.*/
            },
            {
                test: /\.tsx?$/u,
                exclude: /node_modules\/(?!custom-component-library)/u,
                include: /.*/
            },
            {
                test: /\.jsx?$/u,
                exclude: /node_modules\/(?!custom-component-library)/u,
                include: /.*/
            }
        ]
    }
};

module.exports = config;
```
