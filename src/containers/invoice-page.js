import React from "react";

// For month and year
import YearMonthSelector from "react-year-month-selector";

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    //this.state = { date: null, selectedDate: "2012-11-15" };
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
  render() {
    return (
      <div>
        <YearMonthSelector
          year={2018}
          month={1}
          onChange={(year, month) => console.log(month)}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default InvoicePage;

/*<YearPicker
          defaultValue={"select year"}
          // default is 1900
          start={2010}
          // default is current year
          end={2020}
          // default is ASCENDING
          reverse
          // default is false
          required={true}
          // default is false
          disabled={true}
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
        <MonthPicker
          defaultValue={"select month"}
          // to get months as numbers
          numeric
          // default is full name
          short
          // default is Titlecase
          caps
          // mandatory if end={} is given in YearPicker
          endYearGiven
          // mandatory
          year={this.state.year}
          // default is false
          required={true}
          // default is false
          disabled={true}
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
        <DayPicker
          defaultValue={"select day"}
          // mandatory
          year={this.state.year}
          // mandatory
          month={this.state.month}
          // mandatory if end={} is given in YearPicker
          endYearGiven
          // default is false
          required={true}
          // default is false
          disabled={true}
          // mandatory
          value={this.state.day}
          // mandatory
          onChange={day => {
            this.setState({ day });
            console.log(day);
          }}
          id={"day"}
          name={"day"}
          classes={"classes"}
          optionClasses={"option classes"}
        /> */

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
