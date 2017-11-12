import React from 'react';
import { Button } from 'react-bootstrap';

export default class OrdersTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onEditClick(order) {
        console.log('onEditClick: order=')
        console.dir(order);
        const orderid = order.OrderId;
        this.props.orderClick(orderid);
    }

    onPrintClick(order) {
        const orderid = todo.orderid;
        this.props.printClick(orderid);
    }



    render() {
        const header_row = (<div className="row-todo">
                                
                                <div className="tbl-col-hdr col-inv-2">
                                    Order Id
                                </div>
                                <div className="tbl-col-hdr col-inv-3">
                                    Number
                                </div>
                                <div className="tbl-col-hdr col-inv-1">
                                    Type
                                </div>
                                <div className="tbl-col-hdr col-inv-7">
                                    Name
                                </div>
                                <div className="tbl-col-hdr col-inv-4">
                                    Order date
                                </div>
                                <div className="tbl-col-hdr col-inv-5">
                                    StudioMor date
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Status
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Edit
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Print
                                </div>
                            </div>);

        var rows = [];
        for (var i=0; i<this.props.orders.length; i++)
        {
            var o = this.props.orders[i];
            var row_class = { true: "row-todo", true: "alert-row" };
            var row = (<div key={o.orderid} className= { (true ? "row-todo": "") + (true ? "alert-row": "") } > 
                            
                            <div className="tbl-col col-inv-2">
                                { o.OrderId }
                            </div>
                            <div className="tbl-col col-inv-3">
                                { o.OrderNumber }
                            </div>
                            <div className="tbl-col col-inv-1">
                                { o.AlumType }
                            </div>
                            <div className="tbl-col col-inv-7">
                                { o.Name }
                            </div>
                            <div className="tbl-col col-inv-4">
                                { o.OrderDate }
                            </div>
                            <div className="tbl-col col-inv-5">
                                { o.DateCreated }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { o.OrderStatus }
                            </div>
                            <div className="tbl-col col-inv-6">
                                <Button bsStyle="primary" onClick={this.onEditClick.bind(this, o)}>Edit</Button>
                            </div>
                            <div className="tbl-col col-inv-6">
                               <Button bsStyle="primary" onClick={this.onPrintClick.bind(this, o)}>Print</Button>
                            </div>
                        </div>);
            rows.push(row);        
        }                

        return (

            <div className="tbl-todo">
                
                {header_row}
                {rows}
            </div>
        )
    }
}