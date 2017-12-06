
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


class HotFoldersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            orders: [],
            single_view: false,
            single_printcode: {},  
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






    render() {

        let page = <div></div>;
        
        if (!this.state.single_view) {
            page =  <div>
                        <HotFoldersTable printcodes={this.state.printcodes} editHotFolderClick={(printcode_id) => this.openOrder(orderid)} printClick={(orderid) => this.printOrder(orderid) } />

                        <Pager 
                            total = {this.state.paging.total} 
                            current={this.state.paging.current}
                            onSkipTo={this.handlePageChanged.bind(this)}
                            />
                    </div>
        }
        else {
            page = <div>
                        <HotFolderView printcode={this.state.single_printcode} />
                    </div>
        }        
        return (

            <div className="ts-page">
                
                <Header />
                <h2>Hot folders</h2>
                {page}
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

export default connect(mapStateToProps, mapDispatchToProps)(HotFoldersPage);


