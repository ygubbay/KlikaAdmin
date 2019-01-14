import React from "react";
import { Button, Checkbox } from "react-bootstrap";
import { YearPicker, MonthPicker } from "react-dropdown-date";
import Header from "../components/Header";
import * as api from "../api";

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: this.getCurrentYear(),
      month: this.getCurrentMonth(),
      extra_info: 0
    };
    console.log(
      "this.state.year: " +
        this.state.year +
        "\tthis.state.month: " +
        this.state.month
    );
  }

  //  componentWillMount() {
  //     //need to do a logout here...
  //     const email = utils.getCookie("email");
  //     if (email != undefined) {
  //       this.setState({ email: email });
  //     }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
  //     JSON.stringify(this.state) !== JSON.stringify(nextState)
  //   );
  // }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getCurrentMonth() {
    const month = new Date().getMonth();
    return month;
  }

  getMonthName(month_num) {
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
    const month_name = month_num;
    return monthNames[month_name];
  }

  checkMonthExists() {
    console.log("No per existing records before 11-2017");
    if (this.state.year == 2017 && this.state.month < 11) return false;
    return true;
  }

  // Look at in daily=orders-page.js function-> onPrintOrdersClick()
  onGenerateInvoiceClick() {
    /* if (!this.state.month) {
      //alert "Please select month"
      return;
    }
    if (!this.state.year) {
      //alert "Please select year"
      return;
    } */
    console.log("generating invoice...");
    console.log("\n--------------------------------------\n");
    console.log(
      "Date that will be passed: " +
        this.year_month() +
        "\textra info:" +
        this.state.extra_info.toString()
    );
    console.log("\n--------------------------------------\n");
    if (!this.checkMonthExists()) {
      // <Alert>
      return;
    }
    api
      .CreateInvoicePdf(this.year_month(), this.state.extra_info.toString())
      .then(response => {
        console.log(
          "something returned in response.... still need to set the downloading in the ui"
        );
        const pdf_url = response.data.pdf;
        console.log("downloading:", pdf_url);
        this.setState({ pdf_print: pdf_url });
        setTimeout(() => {
          downloadFile(this.state.pdf_print);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  }

  year_month() {
    let year4_month2_format = this.state.year;
    const month_num = parseInt(this.state.month) + 1;
    if (month_num + 1 < 10) year4_month2_format += "0" + String(month_num);
    else year4_month2_format += String(month_num);
    return year4_month2_format;
  }

  onExtaInfoChange(event) {
    let new_state = this.state;
    new_state.extra_info = event.target.checked ? 1 : 0;
    this.setState(new_state);
  }

  render() {
    return (
      <div className="ts-page">
        <Header />
        <h2>Monthly Invoice</h2>

        <div className="container">
          <MonthPicker
            defaultValue={this.getMonthName(this.state.month)}
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
            id={"invoice_month"}
            name={"month"}
            classes={"classes"}
            optionClasses={"option classes"}
          />
          <br />
          <YearPicker
            defaultValue={this.state.year}
            // default is 1900
            start={2017}
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
            id={"invoice_year"}
            name={"year"}
            classes={"classes"}
            optionClasses={"option classes"}
          />

          <div className="field-row">
            <Checkbox inline onChange={this.onExtaInfoChange.bind(this)}>
              Additional data
            </Checkbox>
          </div>

          <br />
          <div className="col-xs-6" style={{ textAlign: "right" }}>
            <Button
              bsStyle="success"
              onClick={this.onGenerateInvoiceClick.bind(this)}
            >
              Generate Invoice
            </Button>
          </div>
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default InvoicePage;

window.downloadFile = function(sUrl) {
  //iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    //alert('Your device does not support files downloading. Please try again in desktop browser.');
    window.open(sUrl, "_blank");
    return false;
  }

  //If in Chrome or Safari - download via virtual link click
  if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
    //Creating new link node.
    var link = document.createElement("a");
    link.href = sUrl;
    link.setAttribute("target", "_blank");

    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
      link.download = fileName;
    }

    //Dispatching click event.
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf("?") === -1) {
    sUrl += "?download";
  }

  window.open(sUrl, "_blank");
  return true;
};

window.downloadFile.isChrome =
  navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
window.downloadFile.isSafari =
  navigator.userAgent.toLowerCase().indexOf("safari") > -1;

// window.downloadFile = function(sUrl) {
//   //iOS devices do not support downloading. We have to inform user about this.
//   if (/(iP)/g.test(navigator.userAgent)) {
//     //alert('Your device does not support files downloading. Please try again in desktop browser.');
//     window.open(sUrl, "_blank");
//     return false;
//   }

//   //If in Chrome or Safari - download via virtual link click
//   if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
//     //Creating new link node.
//     var link = document.createElement("a");
//     link.href = sUrl;
//     link.setAttribute("target", "_blank");

//     if (link.download !== undefined) {
//       //Set HTML5 download attribute. This will prevent file from opening if supported.
//       var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
//       link.download = fileName;
//     }

//     //Dispatching click event.
//     if (document.createEvent) {
//       var e = document.createEvent("MouseEvents");
//       e.initEvent("click", true, true);
//       link.dispatchEvent(e);
//       return true;
//     }
//   }

//   // Force file download (whether supported by server).
//   if (sUrl.indexOf("?") === -1) {
//     sUrl += "?download";
//   }

//   window.open(sUrl, "_blank");
//   return true;
// };

// window.downloadFile.isChrome =
//   navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
// window.downloadFile.isSafari =
//   navigator.userAgent.toLowerCase().indexOf("safari") > -1;
