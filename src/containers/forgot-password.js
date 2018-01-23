
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';

import { Alert, Button } from 'react-bootstrap';
import { changePassword, dismissAlerts } from '../actions/userActions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
require('../styles/forgot-password.less');

class ForgotPasswordPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            password1: '',
            password2: ''
        }
        
    }

    componentWillMount() {

        // need to do a logout here...
        console.log('token is: ', this.props.token);
        this.state.name = 'Hey there';
    }

   shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
   }

    onSubmitClick(event) {

        this.props.changePassword(this.state.token, this.state.password1);
        event.preventDefault();
    }

   onEmailChange(event) {
       this.props.dismissAlerts();
       this.setState({email: event.target.value});
   }

   onPasswordChange(event) {
       this.props.dismissAlerts();
       this.setState({password: event.target.value});
   }

   onAlertDismiss() {
       this.props.dismissAlerts();
   }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.user.login)
        {
            utils.setCookie('email', this.state.email);
            this.props.history.push('/orders');
        }

    }


    render() {

        const is_input_valid = this.state.email && this.state.email.length > 5 &&
                                this.state.password && this.state.password.length > 4;

        const alert_element = this.props.user && this.props.user.alerts && this.props.user.alerts.length  ? 
                    <Alert bsStyle="danger" onDismiss={this.onAlertDismiss.bind(this)}>
                        {this.props.user.alerts[0].msg}
                    </Alert>: '';
        return (

            <div className="forgot-page">
               <form onSubmit={this.onSubmitClick.bind(this)}>
               <div><h2>Studio Mor Change Password</h2></div>
               <div className="login-line">
                   <div>Name</div>
                   <div type="email"  className="login-text" onChange={this.onEmailChange.bind(this)}  >value={this.state.name}</div>
               </div>
               <div className="login-line">
                   <div>Password</div>
                   <div><input type="password"  className="login-text" onChange={this.onPasswordChange.bind(this)}  value={this.state.password1} /></div>
               </div>
               <div className="login-line">
                   <div>Password</div>
                   <div><input type="password"  className="login-text" onChange={this.onPasswordChange.bind(this)}  value={this.state.password2} /></div>
               </div>

               <div style={{marginTop: '20px'}}>
                   <Button type="submit"  bsStyle="primary" style={{width: '225px', height: '45px'}}   disabled={!is_input_valid}>Login</Button>
                </div>
               <div><a className="forgot-password" href="Forgot password">Forgot password</a></div>
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
    changePassword,
    dismissAlerts
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
