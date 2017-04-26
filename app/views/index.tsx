import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import App from '../public/js/App';
import Layout from './layout';

export default class IndexView extends React.Component<{}, {}> {
    render() {
        const contentString = ReactDOMServer.renderToStaticMarkup(<App />);
        return (
            <Layout>
                <div id="content" dangerouslySetInnerHTML={{__html: contentString}} />
            </Layout>
        );
    }
}