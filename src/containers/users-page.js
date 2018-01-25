
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import UsersTable from '../components/users-table';
//import UserView from '../components/user-view';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';


import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/users-page.less'

class UsersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            users: [],
            single_view: false,
            paging: {
                total: 10,
                current: 0,
                all_rows: 0
            }
        };
  
    }

    componentWillMount() {

        if (!this.props.user.login)
            this.props.history.push('/login');
        this.getUsers(this.state.paging.current+1, this.state.pagesize);
    }

   shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
   }

    getUsers(pageindex, pagesize) {

        console.log('getUsers: ', pageindex, pagesize);
        api.usersGetPaged(pageindex, pagesize).then((response) => {

            console.log('getUsers response:', response);
            let paging = this.state.paging;
            paging.total = parseInt(response.data.count / this.state.pagesize);

            var add_page = response.data.count - (parseInt(response.data.count / this.state.pagesize)) > 0 ? 1: 0;
            paging.total = parseInt(response.data.count / this.state.pagesize) + add_page;

            paging.all_rows = response.data.count;
            this.setState({ users: response.data.rows, paging: paging });
        }).catch((err) => {
            alert(err);
        })
    }

    refreshUsers(paging) {

        console.log('refreshUsers: ', JSON.stringify(this.state.paging));

        const pager = paging ? paging: this.state.paging;
        this.getOrders(pager.current+1, this.state.pagesize);
    }


    openUser(userid) {
        console.log('openUser: userid:', userid )
        this.setState( { single_view: true, single_userid: userid })
    }

    backToViewUsersClick(order) {

        
        this.setState( { single_view: false, single_orderid: null});
    }


    SaveOrderClick(order) {

        this.setState( { single_view: false, single_orderid: null});
        this.refreshUsers();
    }


    handlePageChanged(page) {
        
        console.log('handlePageChanged: ', page);
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        //this.getOrders(page+1, this.state.pagesize);
        this.refreshUsers( paging );
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

            display = null;
            //display = (
           
                //<UserView orderid={this.state.single_orderid} 
                //            
                //            saveClick={ (order) => this.SaveUserClick(order) }
                //             cancelClick={ () => this.backToViewUsersClick() } />
           //);
        }
        else 
        {
            display = (
            <div className="ts-page">
                
                <Header />

                <div className="users-page">
                    <h2>Users</h2>

                    <div>
                        <UsersTable users={this.state.users} userClick={(userid) => this.openUser(userid)} />

                        <div className="user-pager-div">
                            <Pager total = {this.state.paging.total} 
                                        current={this.state.paging.current}
                                        onSkipTo={this.handlePageChanged.bind(this)} />
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

