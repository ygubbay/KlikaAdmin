import React from "react";
import { Button } from "react-bootstrap";
import { YearPicker, MonthPicker } from "react-dropdown-date";

class TmpInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { year: "", month: "" };
  }

  // componentWillMount() {
  //   if (!this.props.user.login) this.props.history.push("/login");
  // }

  onGenerateInvoiceClick() {
    if (!this.state.month) {
      //alert "Please select month"
      return;
    }
    if (!this.state.year) {
      //alert "Please select year"
      return;
    }
    console.log("generating invoice...");
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getCurrentMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[new Date().getMonth()];
  }

  render() {
    return (
      <div>
        <MonthPicker
          defaultValue={this.getCurrentMonth()}
          // to get months as numbers
          string
          // default is full name
          //long
          // default is Titlecase
          //caps
          // mandatory if end={} is given in YearPicker
          endYearGiven
          // mandatory
          year={this.state.year}
          // default is false
          required={true}
          // default is false
          disabled={false}
          // mandatory
          value={this.state.month}
          // mandatory
          onChange={month => {
            this.setState({ month });
            console.log(month);
          }}
          id={"month"}
          name={"month"}
          classes={"classes"}
          optionClasses={"option classes"}
        />
        <YearPicker
          defaultValue={this.getCurrentYear()}
          // default is 1900
          start={2010}
          // default is current year
          end={this.getCurrentYear()}
          // default is ASCENDING
          reverse
          // default is false
          required={true}
          // default is false
          disabled={false}
          // mandatory
          value={this.state.year}
          // mandatory
          onChange={year => {
            this.setState({ year });
            console.log(year);
          }}
          id={"year"}
          name={"year"}
          classes={"classes"}
          optionClasses={"option classes"}
        />

        <div>
          <Button
            bsStyle="success"
            onClick={this.onGenerateInvoiceClick.bind(this)}
          >
            Generate Invoice
          </Button>
        </div>
      </div>
    );
  }
}

export default TmpInvoice;
