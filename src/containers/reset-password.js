
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';

import { Alert, Button } from 'react-bootstrap';
import { resetPassword, dismissAlerts } from '../actions/userActions';

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


    
    
    onSubmitClick(event) {

        this.props.resetPassword(this.state.email);
        event.preventDefault();
    }

   onEmailChange(event) {
       this.props.dismissAlerts();
       this.setState({email: event.target.value});
   }

    componentWillReceiveProps(nextProps) {

        
        if (nextProps.user.reset_password && nextProps.user.reset_password.is_executed)
        {
            console.log('nextProps:');
            console.dir(nextProps);
            let alerts = [];
            const reset_password = nextProps.user.reset_password;
            if (reset_password.is_error) {
                
                alerts = [ { type: 'danger', msg: reset_password.error_message }]
            }
            else {
                alerts = [ { type: 'success', msg: 'Please check your email account for link to Change Password.' }];

                
            }
            this.setState({
                server_result: reset_password,
                alerts: alerts
            });

            setTimeout(() => { this.props.history.push('/login'); }, 6000);
        }
    }


   onAlertDismiss() {
       this.props.dismissAlerts();
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
    resetPassword,
    dismissAlerts
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
