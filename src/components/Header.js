
import _ from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom'
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class Header extends React.Component {

    constructor(props) {
        super(props);
    }


    onOrdersMenuClick() 
    {
        this.props.menuOrdersClick();

    }

    onTrackingMenuClick() 
    {
        this.props.menuAddTrackingClick();

    }

    
    render() {
        return (

            <div className="orders-header">
                <header style={{ 'background': 'lightgreen',                        
                                'padding': '5px',
                                'textAlign': 'center',
                                'fontSize': '1.3em',
                                'fontFamily': 'cursive' }}>
                    Studio Mor - Klika Orders Admin
                </header>
               
               
                <div>
                    <ButtonGroup justified>
                        <NavLink className="btn btn-default" to="/orders">Orders</NavLink>
                        <NavLink className="btn btn-default" to="/tracking">Delivery Tracking</NavLink>
                        <DropdownButton title="Admin" id="bg-justified-dropdown">
                            <li role="presentation">
                                <NavLink to="/login">Users</NavLink>
                            </li>
                        <li role="presentation">
                            <NavLink to="/login">Logout</NavLink>
                        </li>
                        </DropdownButton>
                    </ButtonGroup>
                </div>
            </div>

        );
    }
}


  
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

