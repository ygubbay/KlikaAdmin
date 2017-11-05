
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from '../components/Header';
import TodoPage from './todo-page';
import CreateInvoice from './create_invoice';
import ViewInvoicesPage from './view-invoices-page';
import ViewInvoice from '../components/invoice-view';
import ViewOrdersPage from './view-orders-page';


export default class App extends React.Component {

  
    render() {

                                   
        return (
            <Router>          
            <div className="ts-page">
                <Header />

                <Route exact path="/" component={TodoPage} />
                <Route exact path="/invoice" component={CreateInvoice} />
                <Route path="/invoices-view" component={ViewInvoicesPage} />
                <Route path="/orders" component={ViewOrdersPage} />
                
            </div>
               </Router>
        );
    }
      
}