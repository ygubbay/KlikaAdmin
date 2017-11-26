
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';

import { Alert, Button } from 'react-bootstrap';
import { loginUser, dismissAlerts } from '../actions/userActions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LoginPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
  
    }

    componentWillMount() {

        const email = utils.getCookie('email');

        if (email != undefined)
        {
            this.setState({ email: email });
        }
    }

    onLoginButtonClick() {

        this.props.loginUser(this.state.email, this.state.password);
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

            <div className="login-page">
               <div><h2>Studio Mor Login</h2></div>
               <div className="login-line">
                   <div>Email</div>
                   <div><input type="email"  className="login-text" onChange={this.onEmailChange.bind(this)} value={this.state.email} /></div>
               </div>
               <div className="login-line">
                   <div>Password</div>
                   <div><input type="password"  className="login-text" onChange={this.onPasswordChange.bind(this)}  value={this.state.password} /></div>
               </div>

               <div style={{marginTop: '20px'}}>
                   <Button type="submit" bsStyle="primary" style={{width: '100px'}}  onClick={this.onLoginButtonClick.bind(this)}  disabled={!is_input_valid}>Login</Button>
                </div>
               <div><a className="forgot-password" href="Forgot password">Forgot password</a></div>
               <div style={{marginTop: '20px'}}>
                   {alert_element}
               </div>
            </div>
        );
    }
}


          
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser,
    dismissAlerts
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
