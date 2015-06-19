var React = require('react');
var Guide = require('./guide');

React.render(
    <Guide badgeUrl="./src/data/badges.json" />,
    document.getElementById('content')
);