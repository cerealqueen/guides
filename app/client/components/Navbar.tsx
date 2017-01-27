import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface NavbarProps {
    app: any
}

export class Navbar extends React.Component<NavbarProps, undefined> {
    ctrls: {
        input?: HTMLInputElement
    } = {}

    handleChange() {
        
    }

    render() {
        return (
            <header>
                <div className="navbar">
                    <a className="starmen" href="http://starmen.net">
                        <img src="../img/logo-starmen.svg" alt="Starmen.net" />
                    </a>
                    <input
                        className="search" 
                        type="search" 
                        placeholder="Search" 
                        value={this.props.filter} 
                        ref={input => this.ctrls.input = input} 
                        onChange={() => this.props.actions.setFilter(this.ctrls.input.value)} />
                    <a className="github" href="https://github.com/aaronsky/badges">
                        <i className="fa fa-github fa-2x"></i>
                    </a>
                </div>
            </header>
        );
    }
}