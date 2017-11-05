
import _ from 'lodash';
import React from 'react';

import * as api from '../api';




export default class InvoiceTodosTable extends React.Component {


    constructor(props) {
        super(props);

    }

    

    onTodoDoubleClick() {
        // View invoice
    }

    render() {


        const header_row = (<div className="row-todo">
                            
                            <div className="tbl-col-hdr col-todo-2">
                                Description
                            </div>
                            <div className="tbl-col-hdr col-todo-3">
                                Start
                            </div>
                            <div className="tbl-col-hdr col-todo-4">
                                End
                            </div>
                            <div className="tbl-col-hdr col-todo-5">
                                Break
                            </div>
                            <div className="tbl-col-hdr col-todo-6">
                                Duration
                            </div>
                            <div className="tbl-col-hdr col-todo-7">
                                Date
                            </div>
                        </div>);

        var rows = [];
        for (var i=0; i<this.props.todos.length; i++)
        {
            var todo = this.props.todos[i];
            var row = (<div key={todo.invoiceentryid} className="row-todo" onDoubleClick={this.onTodoDoubleClick.bind(this, todo)}> 
                            
                            <div className="tbl-col col-todo-2">
                                {todo.description}
                            </div>
                            <div className="tbl-col col-todo-3">
                                {todo.starttime.toString().substr(11, 5)}
                            </div>
                            <div className="tbl-col col-todo-4">
                                {todo.endtime.toString().substr(11, 5)}
                            </div>
                            <div className="tbl-col col-todo-5">
                                {todo.break}
                            </div>
                            <div className="tbl-col col-todo-6">
                                {((new Date(todo.endtime))-(new Date(todo.starttime)))/60000 - todo.break}
                            </div>
                            <div className="tbl-col col-todo-7">
                                {todo.entrydate.substr(0, 10)}
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