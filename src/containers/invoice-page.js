import React from "react";
import { Button } from "react-bootstrap";
import { YearPicker, MonthPicker } from "react-dropdown-date";

// For month and year
import YearMonthSelector from "react-year-month-selector";

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { year: "", month: "" };
  }

  // componentWillMount() {
  //    need to do a logout here...
  //    const email = utils.getCookie("email");
  //    if (email != undefined) {
  //      this.setState({ email: email });
  //    }
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

  // Look at in daily=orders-page.js function-> onPrintOrdersClick()
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
    console.log("\n--------------------------------------\n");
    console.log("Date that will be passed: " + this.year_month());
    console.log("\n--------------------------------------\n");
    api
      .CreateInvoicePdf(this.year_month())
      .then(response => {
        // const pdf_url = response.data.pdf;
        // console.log('downloading:', pdf_url);
        // this.setState({ pdf_print: pdf_url })
        // setTimeout(() => { downloadFile(this.state.pdf_print); }, 1000);
        // There is the function downloadFile to add still from daily-orders-page.js
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

  render() {
    return (
      <div>
        <MonthPicker
          defaultValue={this.getMonthName(this.getCurrentMonth())}
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

export default InvoicePage;

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
