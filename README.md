# custom-webpack-cli

> A no-frill webpack cli that requires next to nothing to get started.

## Install

```bash
npm install neogeek/custom-webpack-cli --save-dev
```

## Usage

**package.json**

```json
{
    "devDependencies": {
        "@neogeek/custom-webpack-cli": "neogeek/custom-webpack-cli"
    },
    "dependencies": {
        "react": "16.9.0",
        "react-dom": "16.9.0",
        "styled-components": "4.3.2"
    },
    "scripts": {
        "start": "custom-webpack-dev-server-cli",
        "build": "custom-webpack-cli"
    }
}
```

**public/index.html**

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
