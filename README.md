# @neogeek/custom-webpack-cli

> 🎒 A no-frill webpack cli that requires next to nothing to get started.

[![NPM Version](http://img.shields.io/npm/v/@neogeek/custom-webpack-cli.svg?style=flat)](https://www.npmjs.org/package/@neogeek/custom-webpack-cli)

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
        "styled-components": "5.2.0"
    },
    "devDependencies": {
        "@neogeek/custom-webpack-cli": "2.4.0"
    },
    "scripts": {
        "start": "custom-webpack-dev-server-cli --port 5000",
        "build": "custom-webpack-cli --port 5000"
    }
}
```

**src/index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>A Simple Component</title>
    </head>
    <body>
        <div id="hello-example"></div>
    </body>
</html>
```

**src/js/index.jsx**

<https://reactjs.org/#a-simple-component>

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('hello-example')
);
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
