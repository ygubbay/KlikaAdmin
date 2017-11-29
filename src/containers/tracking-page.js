
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import OrdersTable from '../components/orders-table';
import StatusFilter from '../components/status-filter';
import OrderView from '../components/order-view';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';


import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TrackingPage extends React.Component {
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

        if (!this.props.user.login)
            this.props.history.push('/login');
        this.getOrders(this.state.paging.current+1, this.state.pagesize);
    }

   shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
   }

    handleStatusListChange(status_list) {

        console.log('status_list:');
        console.dir(status_list);
        if (status_list && status_list.length > 0)
        {
            this.setState({ status_list: status_list });
            this.getOrders(this.state.paging.current+1, this.state.pagesize, status_list);
        }
        else 
        {
            this.setState({ status_list: [] });
            this.getOrders(this.state.paging.current+1, this.state.pagesize);
        }
    }

    getOrders(pageindex, pagesize, order_statuses) {
        api.ordersGetPaged(pageindex, pagesize, order_statuses).then((response) => {

            this.setState({ orders: response.data, status_list: order_statuses });
        }).catch((err) => {
            alert(err);
        })
    }

    refreshOrders() {

        const status_list = this.state.status_list;

        if (status_list && status_list.length > 0)
        {
            this.getOrders(this.state.paging.current+1, this.state.pagesize, status_list);
        }
        else 
        {
            this.getOrders(this.state.paging.current+1, this.state.pagesize);
        }    
    }


    openOrder(orderid) {
        console.log('openOrder: orderid:', orderid )
        this.setState( { single_view: true, single_orderid: orderid })
    }

   printOrder(orderid) {
        console.log('printOrder: orderid:', orderid )
        api.orderPrint(orderid).then((response) => {


            const pdf_url = response.data.pdf;
            console.log('downloading:', pdf_url);
            this.setState({ pdf_print: pdf_url })
            //downloadFile(pdf_url);
            setTimeout(() => { downloadFile(this.state.pdf_print); }, 1000);
            
            
        }).catch((err) => {
            console.log(err);
        })
    }

    

    backToViewOrdersClick(order) {

        
        this.setState( { single_view: false, single_orderid: null});
    }


    SaveOrderClick(order) {

        this.setState( { single_view: false, single_orderid: null});
        this.refreshOrders();
    }


    handlePageChanged(page) {
        
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        this.getOrders(page+1, this.state.pagesize);
    }





    render() {

            return (
            <div className="ts-page">
                <Header />
                <h2>Delivery Tracking</h2>

                <div>
                <label>Order Number:</label>
                <input type="text" style={{fontSize: "2em"}} />
                </div>

                <div>
                <label>Tracking Number:</label>
                <input type="text" style={{fontSize: "2em"}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);


