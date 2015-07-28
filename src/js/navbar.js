var React = require('react');

var NavBar = React.createClass({
    handleChange: function() {
        this.props.onUserType(React.findDOMNode(this.refs.filterTextInput).value);
    },
    render: function () {
        return (
            <header>
            <div className="navbar">
            <a className="starmen" href="http://starmen.net"><img src="http://aaronsky.github.io/badges/img/logo-starmen.svg" alt="Starmen.net"/></a>
            <input className="search" type="search" placeholder="Search" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
            <a className="github" href="https://github.com/aaronsky500/starmen-badge-guide"><i className="fa fa-github fa-2x"></i></a>
            </div>
            </header>
        );
    }
});

module.exports = NavBar;