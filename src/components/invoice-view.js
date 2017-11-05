import React from 'react';


import _ from 'lodash';


import * as api from '../api';

import InvoiceHeader from './invoice-header';
import InvoiceTodosTable from './invoice-todos-table';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';


export default class ViewInvoice extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            header: {},
            todos: []
        }

    }

    componentWillMount() {

        this.getInvoiceHeader(this.props.invoiceid);
        this.getInvoiceTodos(this.props.invoiceid);
    }


    getInvoiceHeader(invoiceid) {

        api.invoiceGetHeader(invoiceid).then((response) => {

            this.setState({header: response.data});
        }).catch((err) => {

            alert(err);
        })
    }   

    getInvoiceTodos(invoiceid) {

        api.invoiceGetTodos(invoiceid).then((response) => 
        {

            this.setState({todos: response.data});

        }).catch((err) => {

            alert(err);
        })
    }

    backClick(event) {

        this.props.onBackClick();
    }

  
    render() {

        return (

            <div>
                <div>
                    <h2 style={{ float: 'left'}}>{this.state.header.invoiceid ? 'Invoice - ' + this.state.header.invoiceid: ''}</h2>

                    <div style={{ float: 'right', textAlign: 'right', marginRight: '20px' }}>
                        <button className="btn btn-danger" onClick={this.backClick.bind(this)}>Back</button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>

                <div style={{marginBottom: '20px'}}>
                    <InvoiceHeader header={this.state.header} />
                </div>
                <InvoiceTodosTable todos={this.state.todos} />
            </div>
        );
    }
}
