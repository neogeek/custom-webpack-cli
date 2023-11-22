# @neogeek/custom-webpack-cli

> 🎒 A no-frill webpack cli that requires next to nothing to get started.

[![NPM Version](http://img.shields.io/npm/v/@neogeek/custom-webpack-cli.svg?style=flat)](https://www.npmjs.org/package/@neogeek/custom-webpack-cli)

## Features

- React 18
- TypeScript 5
- Styled Components
- Sass

## Install

```bash
$ npm install @neogeek/custom-webpack-cli --save-dev
```

## Usage

**package.json**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.1.1"
  },
  "devDependencies": {
    "@neogeek/custom-webpack-cli": "^3.0.0"
  },
  "scripts": {
    "start": "custom-webpack-dev-server-cli",
    "build": "custom-webpack-cli"
  },
  "private": true
}
```

**src/index.jsx**

```javascript
const HelloMessage = ({ name }) => <div>Hello {name}</div>;

import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('body'));

root.render(<HelloMessage name="Taylor" />);
```

## Static Files

All static files (images, audio, video files) should be placed in a folder names `public/` at the root of the project.

## Customization

To customize the webpack config, add a `webpack.custom.js` to the root of your project. The contents of that file will be merged with the [webpack.config.js](webpack.config.js) file distributed with this tool.

### Transpile Custom `node_module` Packages

```javascript
module.exports = {
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
```

### Open Page on Launch

```javascript
module.exports = {
  devServer: {
    open: true,
    openPage: 'blog/'
  }
};
```

### Compile as a CommonJS Module (without including React & ReactDOM)

```javascript
const { resolve } = require('path');

module.exports = {
  externals: {
    react: 'react',
    reactDOM: 'react-dom'
  },
  output: {
    filename: 'bundle.min.js',
    path: resolve(process.cwd(), 'dist'),
    publicPath: '/',
    library: {
      type: 'commonjs2'
    }
  }
};
```
