import * as React from 'react';

export default class LayoutView extends React.Component<{}, {}> {
    render() {
        return (
            <html>
                <head>
                    <title>Starmen.net Badge Guide</title>
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='description' content='Guide to the badges you can earn while on the Starmen.net Forums' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
                    <link rel='icon' type='image/png' href='/img/logo-starmen-small.png' />
                    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' />
                    <link rel='stylesheet' type='text/css' href='/css/foundation.css' />
                    <link rel='stylesheet' type='text/css' href='/css/guide.css' />
                </head>
                <body>
                    {this.props.children}
                    <script src='/js/app.bundle.js' />
                </body>
            </html>
        );
    }
}