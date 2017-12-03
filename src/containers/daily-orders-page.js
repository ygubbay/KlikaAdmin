
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import OrdersTable from '../components/orders-table';
import OrderView from '../components/order-view';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';


import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class DailyOrdersPage extends React.Component {
  constructor(props) {
        super(props);

        const current_date = new Date();
        const today_date = new Date();
        

          this.state = {
                datePickerOpen: false,
                selectedDay: today_date,
            }
  
    }

    componentWillMount() {

        if (!this.props.user.login)
            this.props.history.push('/login');
    }

    componentDidMount() {
        
    }


    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.selectedDay) {

            this.getOrdersByDay(nextProps.selectedDay);
        }
        
    }


    getOrdersByDay(yyyymmdd)
    {
        api.getDailyOrders(yyyymmdd).then((response) => {

            this.setState({ orders: response.data });
        }).catch((err) => {

            alert(err);
        });
    }

    handleDayPickerOpen() {
        this.setState( { datePickerOpen: !this.state.datePickerOpen})
    }

    handleDayClick = (day) => {
    
        this.setState({ selectedDay: day });
        this.getOrdersByDay(day.getFullYear() + '' + (day.getMonth()+1) + '' + day.getDate());
        
        this.handleDayPickerOpen();
    }


    render() {

        const day_picker = this.state.datePickerOpen ? (
        
                <div className="day-picker-dd">
                    <DayPicker
                    defaultValue = { this.state.selectedDay  }
                    initialMonth={this.state.selectedDay}
                    selectedDays={ this.state.selectedDay }
                    onDayClick={ this.handleDayClick.bind(this) } />
                </div>): (<div></div>);

            const orders_table = this.state.orders && this.state.orders.length > 0 ?  <OrdersTable orders={this.state.orders} />: '';

            return (
            <div className="ts-page">
                <Header />
                <h2>Daily Orders</h2>

                <div className="ts-daypicker col-xs-6">
                    <div>
                        <div>
                            <input className="todo-day" type="text" value={this.state.selectedDay.toString().substr(0, 15)}  readOnly />
                            <span id="open-daypicker">
                                <Glyphicon style={{color: '#337ab7', fontSize: '1.3em', cursor: 'pointer'}} glyph={this.state.datePickerOpen ? "chevron-up": "chevron-down"} onClick={this.handleDayPickerOpen.bind(this)}  />
                            </span>
                        </div>
                    </div>

                    {day_picker}
 
                </div> 
                <div className="col-xs-6" style={{textAlign: "right"}}>
                    <Button bsSize="XLarge" bsStyle="success">Print Daily Orders</Button>
                </div>
                <div style={{clear: "both"}}></div>
                <hr />
                <div>

                    
                    {orders_table}
                </div>
                <div style={{clear: "both"}}></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DailyOrdersPage);


