
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from '../components/Header';
import LoginPage from './login-page';
import ViewOrdersPage from './view-orders-page';


export default class App extends React.Component {

  
    render() {

                                   
        return (
            <Router>          
            <div className="ts-page">
                <Header />

                <Route exact path="/" component={LoginPage} />
                <Route exact path="/login" component={LoginPage} />

                <Route component={EnsureLoggedInContainer}>
                    <Route path="/orders" component={ViewOrdersPage}  />
                </Route>
                
            </div>
               </Router>
        );
    }
      
}
