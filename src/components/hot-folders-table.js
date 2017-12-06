import React from 'react';
import { Button } from 'react-bootstrap';

export default class HotFoldersTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onEditClick(print_code) {
        
        this.props.editClick(print_code);
    }



    render() {
        const header_row = (<div className="row-todo">
                                
                                <div key={'1'} className="tbl-col-hdr col-inv-2">
                                    Id
                                </div>
                                <div key={'12'} className="tbl-col-hdr col-inv-3">
                                    Name
                                </div>
                                <div key={'13'} className="tbl-col-hdr col-inv-1">
                                    Hot folder
                                </div>
                               
                                <div key={'18'} className="tbl-col-hdr col-inv-6">
                                    Edit
                                </div>
                               
                            </div>);

        var rows = [];
        for (var i=0; i<this.props.orders.length; i++)
        {
            var o = this.props.orders[i];
            var row_class = { true: "row-todo", true: "alert-row" };
            var row = (<div key={o.orderid} className= { "row-todo" + (o.OrderStatusId == 3 || o.OrderStatusId == 4 ? " alert-row": "") 
                                                                    + (o.OrderStatusId == 6 ? " success-row": "" ) } > 
                            
                            <div className="tbl-col col-inv-2">
                                { o.OrderId }
                            </div>
                            <div className="tbl-col col-inv-3">
                                { o.OrderNumber }
                            </div>
                            <div className="tbl-col col-inv-1">
                                { o.AlumType }
                            </div>
                            

                            <div className="tbl-col col-inv-6">
                                <Button bsStyle="primary" onClick={this.onEditClick.bind(this, o)}>Edit</Button>
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