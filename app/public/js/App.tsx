import * as React from 'react';
import { Guide } from './components';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <Guide badges={require('../data/badges.json').badges} />
        )
    }
}