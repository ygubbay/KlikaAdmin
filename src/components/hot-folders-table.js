import React from 'react';
import { Button } from 'react-bootstrap';

export default class HotFoldersTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onEditClick(print_code) {
        console.log('onEditClick', print_code);
        this.props.editClick(print_code);
    }

    render() {

        if (!this.props.printcodes)
            return <div className="empty"></div>

        const header_row = (<div className="row-todo">
                                
                                <div key={'1'} className="tbl-col-hdr col-hot-1">
                                    Id
                                </div>
                                <div key={'12'} className="tbl-col-hdr col-hot-2">
                                    Name
                                </div>
                                <div key={'13'} className="tbl-col-hdr col-hot-3">
                                    Hot folder
                                </div>
                               
                                <div key={'18'} className="tbl-col-hdr col-hot-4">
                                    Edit
                                </div>
                               
                            </div>);

        var rows = [];

        this.props.printcodes.map((printcode) => {

            var row_class = { true: "row-todo", true: "alert-row" };
            var row = (<div key={printcode.id} className= { "row-todo" } > 
                            
                            <div className="tbl-col col-hot-1">
                                { printcode.id }
                            </div>
                            <div className="tbl-col col-hot-2">
                                { printcode.name }
                            </div>
                            <div className="tbl-col col-hot-3">
                                { printcode.hot_folder }
                            </div>
                            

                            <div className="tbl-col col-hot-4">
                                <Button bsStyle="primary" onClick={this.onEditClick.bind(this, printcode)}>Edit</Button>
                            </div>
                           
                        </div>);
            rows.push(row);        
        })

        return <div>
            {header_row}
            {rows}
        </div>;

         //{header_row}
         //{rows}
    }
}