
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

//import InvoiceTable from '../components/invoice-table';
import OrdersTable from '../components/orders-table';
//import InvoiceView from '../components/invoice-view';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';

import Pager from 'rc-pager';

export default class ViewOrdersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            orders: [],
            single_view: false,
            single_invoiceid: 0,  // dummy
            paging: {
                total: 10,
                current: 0
            }
        }
  
    }

    componentWillMount() {
        this.getOrders(this.state.paging.current+1, this.state.pagesize);
    }

    getOrders(pageindex, pagesize) {
        api.ordersGetPaged(pageindex, pagesize).then((response) => {

            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        })
    }


    openOrder(orderid) {

        this.setState( { single_view: true, single_orderid: orderid })
    }


    backToViewOrdersClick(event) {
        this.setState( { single_view: false, single_orderid: null});
    }


    handlePageChanged(page) {
        
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        this.getOrders(page+1, this.state.pagesize);
    }



    render() {

        var display;
        if (this.state.single_view) {

            display = (
           
                <OrderView orderid={this.state.single_orderid} 
                             onBackClick={ () => this.backToViewOrdersClick() } />
           );
        }
        else 
        {
            display = (
            <div>
                <h2>Orders</h2>
                <OrdersTable orders={this.state.orders} orderClick={(orderid) => this.openOrder(orderid) } />

                <Pager 
                    total = {this.state.paging.total} 
                    current={this.state.paging.current}
                    onSkipTo={this.handlePageChanged.bind(this)}
                    />
            </div>
            )
        }
        return (

            <div>
                {display}
            </div>
        );
    }
}