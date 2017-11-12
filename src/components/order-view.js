import React from 'react';
import { Button } from 'react-bootstrap';
import * as api from '../api';

export default class OrderView extends React.Component {


    constructor(props) {
        super(props);

        this.state = { order: {}, statuses: [] };
    }

    componentDidMount() {

        api.orderGetById(this.props.orderid).then((response) => 
        {

            this.setState({ order: response.data });
        }).catch((err) => console.log(err) );

        api.getOrderStatuses().then((response) => 
        {
            var statuses = response.data.reverse();
            this.setState({ statuses: statuses });
        }).catch((err) => console.log(err) );
    }


    onSaveClick(order) {
        const orderid = order.orderid;
        this.props.saveClick(this.state.order);
        
    }

    onCancelClick() {
        this.props.cancelClick();
    }

    render() {
        
        const order = this.state.order; 

        const status_buttons =  this.state.statuses.map((status, index) => <MenuItem eventKey={status.Id}>status.Name</MenuItem>);                                               


      
        return (

            <div className="order-view">
                
                <h2>Order - {order.OrderNumber}</h2>
                <div>
                    <div className="fld fld1">Id</div>
                    <div className="fld fld2">{order.OrderId}</div>
                </div>
                <div>
                    <div className="fld fld1">Operator Id</div>
                    <div className="fld fld2">{order.OperatorId}</div>
                </div>
                <div>
                    <div className="fld fld1">Album Type</div>
                    <div className="fld fld2">{order.AlumType}</div>
                </div>
                <div>
                    <div className="fld fld1">Quantity</div>
                    <div className="fld fld2">{order.Quantity}</div>
                </div>
                <div>
                    <div className="fld fld1">Name</div>
                    <div className="fld fld2">{order.Name}</div>
                </div>
                <div>
                    <div className="fld fld1">Address</div>
                    <div className="fld fld2">{order.Address}</div>
                </div>
                <div>
                    <div className="fld fld1">PhoneNumber</div>
                    <div className="fld fld2">{order.PhoneNumber}</div>
                </div>
                <div>
                    <div className="fld fld1">FileName1</div>
                    <div className="fld fld2">{order.FileName1}</div>
                </div>
                <div>
                    <div className="fld fld1">FileName2</div>
                    <div className="fld fld2">{order.FileName2}</div>
                </div>
                <div>
                    <div className="fld fld1">Shipping Type</div>
                    <div className="fld fld2">{order.ShippingType}</div>
                </div>
                <div>
                    <div className="fld fld1">Shipping Address</div>
                    <div className="fld fld2">{order.ShippingAddress}</div>
                </div>
                <div>
                    <div className="fld fld1">Mail</div>
                    <div className="fld fld2">{order.Mail}</div>
                </div>
                <div>
                    <div className="fld fld1">Order Date</div>
                    <div className="fld fld2">{order.OrderDate}</div>
                </div>
                <div>
                    <div className="fld fld1">Status</div>
                    <div className="fld fld2">{order.OrderStatus}</div>
                    <div className="fld fld2"><DropdownButton title="Default button" id="dropdown-size-medium">
                                                {status_buttons}
                                            </DropdownButton></div>
                    
                </div>

                <div>
                    <Button bsClass="primary" onClick={this.onSaveClick.bind(this, this.state.order)}>Save</Button>
                    <Button bsClass="cancel" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                    
                </div>
                
            </div>
        )
    }
}