import React from 'react';

export default class OrdersTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onTodoDoubleClick(order) {

        const orderid = todo.orderid;
        this.props.orderClick(orderid);
    }


    render() {
        const header_row = (<div className="row-todo">
                                
                                <div className="tbl-col-hdr col-inv-2">
                                    Order Id
                                </div>
                                <div className="tbl-col-hdr col-inv-3">
                                    Number
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Alum type
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Name
                                </div>
                                <div className="tbl-col-hdr col-inv-4">
                                    Order date
                                </div>
                                <div className="tbl-col-hdr col-inv-5">
                                    Book4Me date
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Status
                                </div>
                                
                            </div>);

        var rows = [];
        for (var i=0; i<this.props.orders.length; i++)
        {
            var o = this.props.orders[i];
            var row = (<div key={o.orderid} className="row-todo" onDoubleClick={this.onTodoDoubleClick.bind(this, o)}> 
                            
                            <div className="tbl-col col-inv-2">
                                { o.OrderId }
                            </div>
                            <div className="tbl-col col-inv-3">
                                { o.OrderNumber }
                            </div>
                            <div className="tbl-col col-inv-4">
                                { o.AlumType }
                            </div>
                            <div className="tbl-col col-inv-5">
                                { o.Name }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { o.OrderDate }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { o.DateCreated }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { o.OrderStatus }
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