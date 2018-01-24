
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';
import * as api from '../api';

import { Alert, Button } from 'react-bootstrap';



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
require('../styles/forgot-password.less');

class ForgotPasswordPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            token: this.props.match.params.token,
            account_name: '',
            password1: '',
            password2: '',
            valid_token: false,
            server_result: null
        }
        
    }

    SUCCESS_MESSAGE = 'Password was changed successfully.  In a few seconds, you will be redirected to the Login again.'
    FAILURE_MESSAGE = "Failure occurred during Change Password.  Please contact System Administrator.";
    LOGIN_REDIRECT_DELAY = 10000;

    componentWillMount() {

        
        console.log('token is: ', this.state.token);
        api.getChangePassword(this.state.token).then((response) => {

            console.log('getChangePassword:');
            console.dir(response);

            if (response.data.is_error)
            {
                const alerts = [ { type: 'danger', msg: response.data.error_message }]
                this.setState( { valid_token: false, alerts: alerts } );
            }
            else {
                
                this.setState( { valid_token: true, account_name: response.data.account_name } );
            }

        }).catch((err) => {
            console.log('getChangePassword error: ', err);
        })
        
    }


    onSubmitClick(event) {

        //this.props.changePassword(this.state.token, this.state.password1);
        
        api.changePassword(this.state.token, this.state.password1)
            .then((response) => {
                console.log('changePassword Response:');
                console.dir(response);

                let alerts = [];
                if (response.data.is_error) 
                {
                    console.log('changePassword error:');
                    alerts = [ { type: 'danger', msg: forgot_password.error_message }]
                }
                else {
                    alerts = [ { type: 'success', msg: this.SUCCESS_MESSAGE }];
                    console.log('changePassword success:');
                }
                    
                this.setState({
                    server_result: response.data,
                    alerts: alerts
                });

                setTimeout(() => { this.props.history.push('/login'); }, this.LOGIN_REDIRECT_DELAY);
            })
            .catch((err) => {
                console.log('changePassword failure:');
                console.dir(err);
                let alerts = [ { type: 'danger', msg: this.FAILURE_MESSAGE }];

                this.setState({
                    server_result: err,
                    alerts: alerts
                });

                setTimeout(() => { this.props.history.push('/login'); }, this.LOGIN_REDIRECT_DELAY);
                
            });
        event.preventDefault();
    }

   onPassword1Change(event) {
       this.onAlertDismiss();
       this.setState({password1: event.target.value});
   }
   onPassword2Change(event) {
       this.onAlertDismiss();
       this.setState({password2: event.target.value});
   }

   onAlertDismiss() {
       this.setState({ alerts: [] } );
   }


    render() {

        const is_input_valid = this.state.valid_token && !this.state.server_result && this.state.password1 && this.state.password1.length > 4 &&
                                this.state.password1 == this.state.password2 ;

        const alert_element =  this.state.alerts && this.state.alerts.length  ? 
                    <Alert bsStyle={this.state.alerts[0].type} onDismiss={this.onAlertDismiss.bind(this)}>
                        {this.state.alerts[0].msg}
                    </Alert>: '';
        return (

            <div className="forgot-page">
                <div><h2>Studio Mor - Change Password</h2></div>
               <form onSubmit={this.onSubmitClick.bind(this)} className={ this.state.valid_token ? "": "hide-this" } >
                <div className="login-line">
                    <label>Account Name: </label>&nbsp;&nbsp;
                    <div className="account-name" >{this.state.account_name}</div>
                </div>
                <div className="login-line">
                    <div>New Password</div>
                    <div><input type="password"  className="login-text" onChange={this.onPassword1Change.bind(this)}  value={this.state.password1} /></div>
                </div>
                <div className="login-line">
                    <div>Verify Password</div>
                    <div><input type="password"  className="login-text" onChange={this.onPassword2Change.bind(this)}  value={this.state.password2} /></div>
                </div>

                <div style={{marginTop: '20px'}}>
                    <Button type="submit"  bsStyle="primary" style={{width: '225px', height: '45px'}}   disabled={!is_input_valid}>Change password</Button>
                    </div>
               
               </form>

               <div style={{marginTop: '20px'}}>
                   {alert_element}
               </div>
            </div>
        );
    }
}


          
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
