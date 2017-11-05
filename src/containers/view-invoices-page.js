
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import InvoiceTable from '../components/invoice-table';
import InvoiceView from '../components/invoice-view';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';

import Pager from 'rc-pager';

export default class ViewInvoicesPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            invoices: [],
            single_view: false,
            single_invoiceid: 0,  // dummy
            paging: {
                total: 10,
                current: 0
            }
        }
  
    }

    componentWillMount() {
        this.getInvoices(this.state.paging.current+1, this.state.pagesize);
    }

    getInvoices(pageindex, pagesize) {
        api.invoicesGetPaged(pageindex, pagesize).then((response) => {

            this.setState({ invoices: response.data });
        }).catch((err) => {
            alert(err);
        })
    }


    openInvoice(invoiceid) {

        this.setState( { single_view: true, single_invoiceid: invoiceid })
    }


    backToViewInvoicesClick(event) {
        this.setState( { single_view: false, single_invoiceid: null});
    }


    handlePageChanged(page) {
        
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        this.getInvoices(page+1, this.state.pagesize);
    }



    render() {

        var display;
        if (this.state.single_view) {

            display = (
           
                <InvoiceView invoiceid={this.state.single_invoiceid} 
                             onBackClick={ () => this.backToViewInvoicesClick() } />
           );
        }
        else 
        {
            display = (
            <div>
                <h2>View Invoices</h2>
                <InvoiceTable invoices={this.state.invoices} invoiceClick={(invoiceid) => this.openInvoice(invoiceid) } />

                <Pager 
                    total = {this.state.paging.total} 
                    current={this.state.paging.current}
                    onSkipTo={this.handlePageChanged.bind(this)}
                    />
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