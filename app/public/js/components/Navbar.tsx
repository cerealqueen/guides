import * as React from 'react';
import * as ReactDOM from 'react-dom';

export enum SortDirection {
    ascending,
    descending
};

interface NavbarProps {
    filterText: string;
    onChange: (newValue: string) => void;
}

interface NavbarState {

}

export class Navbar extends React.Component<NavbarProps, NavbarState> {
    private input?: HTMLInputElement = null;

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onChange(this.input.value);
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
                        ref={(ref) => { this.input = ref; }}
                        value={this.props.filterText}
                        onChange={this.handleChange} />
                    <a className="github" href="https://github.com/aaronsky/badges">
                        <i className="fa fa-github fa-2x"></i>
                    </a>
                </div>
            </header>
        );
    }
}