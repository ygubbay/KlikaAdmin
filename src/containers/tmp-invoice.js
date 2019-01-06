import React from "react";
import _ from "lodash";
import * as api from "../api";
class TmpInvoice extends React.Component {
  componentWillMount() {
    if (!this.props.user.login) this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <h1>Hello tmp World</h1>
      </div>
    );
  }
}

export default TmpInvoice;
