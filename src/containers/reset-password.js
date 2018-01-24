
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';
import * as api from '../api';

import { Alert, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
require('../styles/reset-password.less');

class ResetPasswordPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            email: '',
            server_result: { is_executed: false }
        }
        
    }


    SUCCESS_MESSAGE = "Please check your email account for link to Change Password.";
    FAILURE_MESSAGE = "Failure occurred during Change Password.  Please contact System Administrator.";
    LOGIN_REDIRECT_DELAY = 10000;
    
    onSubmitClick(event) {

        //this.props.resetPassword(this.state.email);
        api.resetPassword(this.state.email).then((response) => {

            console.log('resetPassword Response:');
            console.dir(response);

            let alerts = [];
            if (response.data.is_error) 
            {
                console.log('resetPassword error:');
                alerts = [ { type: 'danger', msg: response.data.error_message }]
                //dispatch( { type: "RESETPASSWORD_FAIL", payload: response.data});

            }
            else 
            {
                console.log('resetPassword success:');
                alerts = [ { type: 'success', msg: this.SUCCESS_MESSAGE }]

//                dispatch({type: "RESETPASSWORD_OK", payload: response.data});                
            }

            this.setState({
                server_result: response.data,
                alerts: alerts
            });

            setTimeout(() => { this.props.history.push('/login'); }, this.LOGIN_REDIRECT_DELAY);

        }).catch((err) => {
            console.log('resetPassword failure:');
            console.dir(err);
            let alerts = [ { type: 'danger', msg: this.FAILURE_MESSAGE }]

            this.setState({
                server_result: err,
                alerts: alerts
            });

            setTimeout(() => { this.props.history.push('/login'); }, this.LOGIN_REDIRECT_DELAY);

        });
        event.preventDefault();
    }

   onEmailChange(event) {
       //this.props.dismissAlerts();
       this.setState({email: event.target.value});
   }


   onAlertDismiss() {
       //this.props.dismissAlerts();
   }

   validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
    }

    render() {

        const is_input_valid = !this.state.server_result.is_executed && this.state.email && this.validateEmail(this.state.email) ;

        const alert_element =  this.state.alerts && this.state.alerts.length  ? 
                    <Alert bsStyle={this.state.alerts[0].type} onDismiss={this.onAlertDismiss.bind(this)}>
                        {this.state.alerts[0].msg}
                    </Alert>: '';
        return (

            <div className="reset-page">
               <form onSubmit={this.onSubmitClick.bind(this)}>
               <div><h2>Studio Mor - Reset Password</h2></div>
               <div className="login-line">
                   <div className="email-label">Email</div>
                   <div className="email-input"><input type="email"  className="login-text" onChange={this.onEmailChange.bind(this)} value={this.state.name} /></div>
               </div>

               <div className="login-line reset-button-line" style={{marginTop: '20px'}}>
                   <Button type="submit"  bsStyle="primary" style={{width: '225px', height: '45px'}}   disabled={!is_input_valid}>Reset</Button>
                </div>
               <div style={{marginTop: '20px'}}>
                   {alert_element}
               </div>
               </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
