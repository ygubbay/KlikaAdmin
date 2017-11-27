
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, browserHistory
} from 'react-router-dom'
import Header from '../components/Header';
import LoginPage from './login-page';
import ViewOrdersPage from './view-orders-page';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import { isLoggedIn } from '../utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {

    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

        // if (isLoggingIn) {
        // dispatch(navigateTo(redirectUrl))
        // } else if (isLoggingOut) {
        // // do any kind of cleanup or post-logout redirection here
        // }
    }
  
    render() {

                                   
        return (
            <Router>
                <div className="ts-page">
                    <Route exact path="/" component={LoginPage} />         
                        
                    <Route path="/login" component={LoginPage} />
                    <Route path="/pizzas" component={ViewOrdersPage} />
                    <Route path="/orders" component={ViewOrdersPage}  />
                    
                </div>
                
            </Router>
        );
    }
      
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loggedIn,
    redirectUrl: state.redirectUrl
  }
}

export default connect(mapStateToProps)(App)
          
