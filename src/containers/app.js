import React from "react";
import { BrowserRouter, Route, Link, browserHistory } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "./login-page";
import ResetPasswordPage from "./reset-password";
import ForgotPasswordPage from "./forgot-password";
import ViewOrdersPage from "./view-orders-page";
import TrackingPage from "./tracking-page";
import DailyOrdersPage from "./daily-orders-page";
import HotFoldersPage from "./hot-folders-page";
import UsersPage from "./users-page";
import InvoicePage from "./invoice-page";

import EnsureLoggedInContainer from "./EnsureLoggedInContainer";
import { isLoggedIn } from "../utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Testing
import TmpInvoice from "./tmp-invoice";

class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl } = this.props;
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginPage} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/resetpassword" component={ResetPasswordPage} />

          <Route path="/forgotpassword/:token" component={ForgotPasswordPage} />
          <Route exact path="/tracking" component={TrackingPage} />
          <Route exact path="/dailyjobs" component={DailyOrdersPage} />
          <Route exact path="/orders" component={ViewOrdersPage} />
          <Route exact path="/hotfolders" component={HotFoldersPage} />
          <Route exact path="/users" component={UsersPage} />

          <Route exact path="/invoicepage" component={InvoicePage} />
          <Route exact path="/tmpinvoicepage" component={TmpInvoice} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loggedIn,
    redirectUrl: state.redirectUrl
  };
}

export default connect(mapStateToProps)(App);
