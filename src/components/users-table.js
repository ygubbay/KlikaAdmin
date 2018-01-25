import React from 'react';
import { Button } from 'react-bootstrap';

export default class UsersTable extends React.Component {

    constructor(props) {
        super(props);

    }


    onEditClick(user) {
        const userid = user.UserId;
        this.props.orderClick(userid);
    }


    render() {
        const header_row = (<div className="row-todo">
                                
                                <div key={'12'} className="tbl-col-hdr col-user-1">
                                    Email
                                </div>
                                <div key={'13'} className="tbl-col-hdr col-user-2">
                                    First name
                                </div>
                                <div key={'14'} className="tbl-col-hdr col-user-3">
                                    Last Name
                                </div>
                                <div key={'1'} className="tbl-col-hdr col-user-4">
                                    Role
                                </div>
                                <div key={'15'} className="tbl-col-hdr col-user-5">
                                    Status
                                </div>
                                
                                <div key={'18'} className="tbl-col-hdr col-user-6">
                                    Edit
                                </div>
                                
                            </div>);

        var rows = [];

        this.props.users.map((user) => {

            var row = (<div key={user.user_id} className= "row-todo" > 
                            
                            <div className="tbl-col col-user-1">
                                { user.email }
                            </div>
                            <div className="tbl-col col-user-2">
                                { user.firstname }
                            </div>
                            <div className="tbl-col col-user-3">
                                { user.lastname }
                            </div>
                            <div className="tbl-col col-user-4">
                                { user.role_name }
                            </div>
                            <div className="tbl-col col-user-5">
                                { user.status_name }
                            </div>
                            <div className="tbl-col col-user-6">
                                <Button bsStyle="primary" onClick={this.onEditClick.bind(this, user)}>Edit</Button>
                            </div>
                        </div>);

            rows.push(row);
        })
        
        return (

            <div className="users-table">
                
                {header_row}
                {rows}
            </div>
        )
    }
}