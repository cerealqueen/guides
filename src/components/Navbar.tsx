import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface NavbarProps {
    filterText: string
    onUserType: (filterText: string) => void
}

export class Navbar extends React.Component<NavbarProps, undefined> {
    ctrls: {
        input?: HTMLInputElement
    } = {}

    handleChange() {
        this.props.onUserType(this.ctrls.input.value);
    }

    render() {
        return (
            <header>
                <div className="navbar">
                    <a className="starmen" href="http://starmen.net">
                        <img src="http://metc.fobby.net/badges/img/logo-starmen.svg" alt="Starmen.net" />
                    </a>
                    <input className="search" type="search" placeholder="Search" value={this.props.filterText} refs={input => this.ctrls.input = input} onChange={this.handleChange} />
                    <a className="github" href="https://github.com/aaronsky500/starmen-badge-guide"><i className="fa fa-github fa-2x"></i></a>
                </div>
            </header>
        );
    }
}

const styles = {
    navbar: {
        margin: 0,
        fontSize: '100%',
        width: '80%'
    },
    starmen: {
        position: 'relative',
        float: 'left',
        marginTop: '0.5em',
        marginLeft: 10,
        width: '40%'
    },
    search: {
        position: 'relative',
        float: 'right'
    },
    github: {
        position: 'absolute',
        right: 0,
        margin: 10
    }
};