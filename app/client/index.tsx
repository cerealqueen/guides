import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { Guide } from './components';

const store = createStore(reducer);
const contentEl = document.getElementById('content');

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Guide />
    </Provider>, 
    contentEl
);
render();
store.subscribe(render);