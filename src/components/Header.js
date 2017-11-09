
import _ from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom'



export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div>
                <header style={{ 'background': 'lightgreen',                        
                                'padding': '5px',
                                'textAlign': 'center',
                                'fontSize': '1.3em',
                                'fontFamily': 'cursive' }}>
                    Studio Mor - Klika Orders Admin
                </header>
                <div>
                    <NavLink to="/" activeClassName="active" ><button>Todo</button></NavLink>
                    <NavLink to="/invoice" activeClassName="active"><button>Create Invoice</button></NavLink> 
                    <NavLink to="/invoices-view" activeClassName="active"><button>View Invoices</button></NavLink>
                </div>
            </div>
        );
    }
}

