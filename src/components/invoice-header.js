
import _ from 'lodash';
import React from 'react';


export default class InvoiceHeader extends React.Component {
  constructor(props) {
        super(props);
    }
     
    render() {

        var header_display;
        
        if (this.props.header.projects != undefined) 
        { 
            header_display = (
            <div id="invoice-header"> 
                <div className="col-xs-6 hdr-block">
                    <div>
                        <label>Project</label>
                        <input type="text" value={this.props.header.projects[0].name} />
                    </div>
                    <div>
                        <label>Period</label>
                        <input type="text" value={this.props.header.mo_periodmonth + '/' + this.props.header.mo_periodyear} />
                    </div>

                
                    <div>
                        <label>Invoice date</label>
                        <input type="text" value={this.props.header.invoicedate.substring(0, 10)} />
                    </div>
                    <div>
                        <label>Payment date</label>
                        <input type="text" value={this.props.header.paymentdate.substring(0, 10)} />
                    </div>

                </div>
                <div className="col-xs-6 hdr-block">
                    <div>
                        <label>Amount (excl Tax)</label>
                        <input type="text" value={this.props.header.amount} />
                    </div>
                    <div>
                        <label>Tax</label>
                        <input type="text" value={this.props.header.amounttotal - this.props.header.amount} />
                    </div>
                    <div>
                        <label>Amount (incl Tax)</label>
                        <input type="text" value={this.props.header.amounttotal} />
                    </div>
                    <div>
                        <label>&nbsp;</label>
                        <input type="text" value={' '} />
                    </div>

                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
        
    }
    else {
        header_display = (<div></div>);
    }

        return header_display;
        
    }
}