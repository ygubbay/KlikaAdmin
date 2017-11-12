
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

//import InvoiceTable from '../components/invoice-table';
import OrdersTable from '../components/orders-table';
import StatusFilter from '../components/status-filter';
import OrderView from '../components/order-view';

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
            },
            order_statuses: []
        }
  
    }

    componentWillMount() {
        this.getOrders(this.state.paging.current+1, this.state.pagesize);
    }

    handleStatusListChange(status_list) {

        console.log('status_list:');
        console.dir(status_list);
        if (status_list && status_list.length > 0)
        {
            this.getOrders(this.state.paging.current+1, this.state.pagesize, status_list);
        }
        else 
        {
            this.getOrders(this.state.paging.current+1, this.state.pagesize);
        }
    }

    getOrders(pageindex, pagesize, order_statuses) {
        api.ordersGetPaged(pageindex, pagesize, order_statuses).then((response) => {

            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        })
    }


    openOrder(orderid) {
        console.log('openOrder: orderid:', orderid )
        this.setState( { single_view: true, single_orderid: orderid })
    }


    backToViewOrdersClick(order) {

        
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
                            saveClick={ (order) => this.backToViewOrdersClick(order) }
                             cancelClick={ () => this.backToViewOrdersClick() } />
           );
        }
        else 
        {
            display = (
            <div>
                <h2>Orders</h2>
                <div style={{textAlign: "right"}}><StatusFilter handleStatusListChange={(status_list) => this.handleStatusListChange(status_list) } /></div>
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