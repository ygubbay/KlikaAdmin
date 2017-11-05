import React from 'react';

export default class InvoiceTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onTodoDoubleClick(todo) {

        const invoiceid = todo.invoiceid;
        this.props.invoiceClick(invoiceid);
    }


    render() {
        const header_row = (<div className="row-todo">
                                
                                <div className="tbl-col-hdr col-inv-2">
                                    Invoice
                                </div>
                                <div className="tbl-col-hdr col-inv-3">
                                    Project
                                </div>
                                <div className="tbl-col-hdr col-inv-4">
                                    Date
                                </div>
                                <div className="tbl-col-hdr col-inv-5">
                                    Status
                                </div>
                                <div className="tbl-col-hdr col-inv-6">
                                    Amount
                                </div>
                                
                            </div>);

        var rows = [];
        for (var i=0; i<this.props.invoices.length; i++)
        {
            var todo = this.props.invoices[i];
            var row = (<div key={todo.invoiceid} className="row-todo" onDoubleClick={this.onTodoDoubleClick.bind(this, todo)}> 
                            
                            <div className="tbl-col col-inv-2">
                                { todo.invoiceid }
                            </div>
                            <div className="tbl-col col-inv-3">
                                { todo.projects[0].name }
                            </div>
                            <div className="tbl-col col-inv-4">
                                { todo.invoicedate.substring(0, 10) }
                            </div>
                            <div className="tbl-col col-inv-5">
                                { todo.InvoiceStatuses[0].name }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { todo.amounttotal }
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