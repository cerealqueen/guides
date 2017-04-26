import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

function start() {
    const container = document.getElementById('content');
    ReactDOM.render(
        <App />,
        container
    );
}

start();