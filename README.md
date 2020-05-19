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
        "react": "16.13.1",
        "react-dom": "16.13.1",
        "styled-components": "5.1.0"
    },
    "devDependencies": {
        "@neogeek/custom-webpack-cli": "1.0.0"
    },
    "scripts": {
        "start": "custom-webpack-dev-server-cli",
        "build": "custom-webpack-cli"
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

## Customization

To customize the webpack config, add a `webpack.custom.js` to the root of your project. The contents of that file will be merged with the [webpack.config.js](webpack.config.js) file distributed with this tool.

**webpack.custom.js**

```javascript
const config = {
    module: {
        rules: [
            {
                exclude: /node_modules\/(?!custom-component-library)/u,
                include: /.*/
            },
            {
                exclude: /node_modules\/(?!custom-component-library)/u,
                include: /.*/
            }
        ]
    }
};

module.exports = config;
```
