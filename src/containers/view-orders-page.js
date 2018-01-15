
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
import Header from '../components/Header';


import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class ViewOrdersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            orders: [],
            single_view: false,
            single_invoiceid: 0,  // dummy
            paging: {
                total: 10,
                current: 0,
                all_rows: 0
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
        
        let paging = this.state.paging;
        paging.current = 0;
        if (status_list && status_list.length > 0)
        {
            this.setState({ status_list: status_list, paging: paging });
            this.getOrders(1, this.state.pagesize, status_list);
        }
        else 
        {
            this.setState({ status_list: [], paging: paging });
            this.getOrders(1, this.state.pagesize);
        }
    }

    getOrders(pageindex, pagesize, order_statuses) {

        console.log('getOrders: ', pageindex, pagesize);
        api.ordersGetPaged(pageindex, pagesize, order_statuses).then((response) => {

            console.log('getOrders response:', response);
            let paging = this.state.paging;
            paging.total = parseInt(response.data.count / this.state.pagesize);

            var add_page = response.data.count - (parseInt(response.data.count / this.state.pagesize)) > 0 ? 1: 0;
            paging.total = parseInt(response.data.count / this.state.pagesize) + add_page;

            paging.all_rows = response.data.count;
            this.setState({ orders: response.data.rows, status_list: order_statuses, paging: paging });
        }).catch((err) => {
            alert(err);
        })
    }

    refreshOrders(paging) {

        console.log('refreshOrders: ', JSON.stringify(this.state.paging));
        const status_list = this.state.status_list;

        const pager = paging ? paging: this.state.paging;

        if (status_list && status_list.length > 0)
        {
            this.getOrders(pager.current+1, this.state.pagesize, status_list);
        }
        else 
        {
            this.getOrders(pager.current+1, this.state.pagesize);
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
        
        console.log('handlePageChanged: ', page);
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        //this.getOrders(page+1, this.state.pagesize);
        this.refreshOrders( paging );
    }

    onFindOrderChanged(event) {

        const order_number = event.target.value;
        if (order_number && order_number.length > 7) 
        {
            console.log('find order:', order_number);
            api.orderGetByOrderNumber(order_number).then((response) => {

                if (response.data.OrderNumber) {

                    this.openOrder(response.data.OrderId);                    
                }
            }).catch((err) => {

                console.dir(err);
                alert(err);
            });
        }
    }





    render() {

        var display;
        if (this.state.single_view) {

            display = (
           
                <OrderView orderid={this.state.single_orderid} 
                            printClick={ (order) => this.printOrder(order.OrderId)}
                            saveClick={ (order) => this.SaveOrderClick(order) }
                             cancelClick={ () => this.backToViewOrdersClick() } />
           );
        }
        else 
        {
            display = (
            <div className="ts-page">
                
                <Header />
                <h2>Orders</h2>

                <div style={{textAlign: "right", marginBottom: "10px", direction: "rtl" }}>
                    <div className="find-order-label">חפש</div>
                    <div className="find-order-inline">&nbsp;<input type="text" className="find-order-input" onChange={this.onFindOrderChanged.bind(this)} /></div>
                </div>
                <div style={{textAlign: "right", marginBottom: "10px"}}><StatusFilter handleStatusListChange={(status_list) => this.handleStatusListChange(status_list) } /></div>

                <hr />
                <OrdersTable orders={this.state.orders} orderClick={(orderid) => this.openOrder(orderid)} printClick={(orderid) => this.printOrder(orderid) } />

                <div>
                    <div style={{display: "inline"}}>
                        <Pager total = {this.state.paging.total} 
                                    current={this.state.paging.current}
                                    onSkipTo={this.handlePageChanged.bind(this)} />
                    </div>
                    <div className="order-count-container">
                        <div className="order-count-inner">{this.state.paging.all_rows > 0 ? this.state.paging.all_rows + ' records': ''}</div>

                    </div>
                </div>
                
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

   
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrdersPage);



window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
       //alert('Your device does not support files downloading. Please try again in desktop browser.');
       window.open(sUrl, '_blank');
       return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        link.setAttribute('target','_blank');

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_blank');
    return true;
}

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;