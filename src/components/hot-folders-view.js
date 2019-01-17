import React from "react";
import { Button } from "react-bootstrap";
import CurrencyInput from "react-currency-input";

export default class HotFoldersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      print_code: Object.assign({}, this.props.printcode),
      base_price_amount: 0
    };

    //this.initial_print_code = this.props.printcode;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(
  //     "componentWillReceiveProps() was called...\t(props)addon_pages: |" +
  //       this.props.printcode.addon_pages +
  //       "|"
  //   );
  // }

  onSaveClick() {
    if (!this.pricesValid()) return;
    console.log("pricing valid");
    console.log("state: " + this.state);
    const pc = this.state.print_code;
    pc.hot_folder_book = pc.hot_folder_book ? pc.hot_folder_book : "";
    pc.hot_folder_cover = pc.hot_folder_cover ? pc.hot_folder_cover : "";
    pc.is_cover = pc.is_cover == null ? 0 : pc.is_cover ? 1 : 0;
    if (pc.is_cover != 1) {
      pc.hot_folder_cover = "";
    }
    // Add price fields to print_code
    //this.addPricesToPC();

    console.log("The state: ");
    console.log(this.state);
    console.log("ok");

    this.props.saveClick(this.state.print_code);
  }

  onCancelClick() {
    //this.setState({ print_code: this.props.printcode, base_price_amount: 0 });
    // this.setState({ print_code: this.props.printcode });
    console.log(
      "After cancel pressed:\n(state)addon_pages: |" +
        this.state.print_code.addon_pages +
        "|\n(props)addon_pages: |" +
        this.props.printcode.addon_pages +
        //"|\n(initial)addon_pages: |" +
        // this.initial_print_code.addon_pages +
        "|"
    );
    this.props.cancelClick();
  }

  onBookHotFolderChange(event) {
    let pc = this.state.print_code;
    pc.hot_folder_book = event.target.value;
    this.setState({ print_code: pc });
  }

  onCoverHotFolderChange(event) {
    let pc = this.state.print_code;
    pc.hot_folder_cover = event.target.value;
    this.setState({ print_code: pc });
  }

  onIsCoverChange(event) {
    let pc = this.state.print_code;
    pc.is_cover = event.target.checked ? 1 : 0;
    this.setState({ print_code: pc });
  }

  onPricingChange(event) {
    // Fix cursor jumping:
    const caret = event.target.selectionStart;
    const element = event.target;
    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });

    const name = event.target.name;
    // Get rid of shekel symbol
    const value =
      event.target.value[0] == "₪"
        ? Number(event.target.value.substring(1, event.target.value.length))
        : Number(event.target.value);

    console.log("name: |" + name + "|");
    console.log("value: |" + value + "|");

    let new_state = this.state;
    new_state.print_code[name] = value;
    this.setState(new_state);
    console.log("setState was called...");
  }

  pricesValid() {
    if (
      !Number.isInteger(this.state.print_code.base_pages) ||
      !Number.isInteger(this.state.print_code.addon_pages) ||
      !Number.isInteger(this.state.print_code.copies_per_box)
    ) {
      // <Alert non Integer>
      console.log("a non integer in input...");
      return false;
    }
    return true;
  }

  allowOnlyNumbers(evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode == 190) return false;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }

  render() {
    const print_code = this.state.print_code;

    return (
      <div className="page hotfolder-view">
        <h2>Hot folder</h2>

        <div className="field-row">
          <div className="fld fld1">Id:</div>
          <div className="fld fld2">{print_code.id}</div>
        </div>
        <div className="field-row">
          <div className="fld fld1">Name:</div>
          <div className="fld fld2">{print_code.name}</div>
        </div>
        <div className="field-row">
          <div className="fld fld1">Book Hot folder:</div>
          <div className="fld fld2">
            <input
              type="text"
              className="hotfolder-text"
              value={print_code.hot_folder_book}
              onChange={this.onBookHotFolderChange.bind(this)}
            />
          </div>
        </div>
        <div className="field-row">
          <div className="fld fld1">Is Cover Hot folder:</div>
          <div className="fld fld2">
            <input
              type="checkbox"
              checked={print_code.is_cover == 1}
              onChange={this.onIsCoverChange.bind(this)}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="fld fld1">Cover Hot folder:</div>
          <div className="fld fld2">
            <input
              type="text"
              className="hotfolder-text"
              disabled={print_code.is_cover != 1}
              value={print_code.hot_folder_cover}
              onChange={this.onCoverHotFolderChange.bind(this)}
            />
          </div>
        </div>

        <div className="pricing-area">
          <h2>Pricing</h2>
          <div className="field-row">
            <div className="fld fld1">Base price:</div>
            <div className="fld fld2">
              <CurrencyInput
                prefix="₪"
                value={this.state.print_code.base_price}
                name="base_price"
                className="price-text"
                onChangeEvent={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Base pages:</div>
            <div className="fld fld2">
              <input
                type="number"
                min="0"
                step="1"
                className="hotfolder-text"
                name="base_pages"
                onKeyPress={event => this.allowOnlyNumbers(event)}
                value={this.state.print_code.base_pages}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Addon price:</div>

            <div className="fld fld2">
              <CurrencyInput
                prefix="₪"
                value={this.state.print_code.addon_price}
                name="addon_price"
                className="price-text"
                onChangeEvent={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Addon pages:</div>
            <div className="fld fld2">
              <input
                type="number"
                min="0"
                step="1"
                className="hotfolder-text"
                name="addon_pages"
                onKeyPress={event => this.allowOnlyNumbers(event)}
                value={this.state.print_code.addon_pages}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Box price:</div>
            <div className="fld fld2">
              <CurrencyInput
                prefix="₪"
                value={this.state.print_code.box_price}
                name="box_price"
                className="price-text"
                onChangeEvent={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Copies per box:</div>
            <div className="fld fld2">
              <input
                type="number"
                min="0"
                step="1"
                className="hotfolder-text"
                name="copies_per_box"
                onKeyPress={event => this.allowOnlyNumbers(event)}
                value={this.state.print_code.copies_per_box}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Packaging price:</div>
            <div className="fld fld2">
              <CurrencyInput
                prefix="₪"
                value={this.state.print_code.packaging_price}
                name="packaging_price"
                className="price-text"
                onChangeEvent={event => this.onPricingChange(event)}
              />
            </div>
          </div>
        </div>

        <div className="field-row" style={{ marginTop: "15px" }}>
          <Button bsStyle="success" onClick={this.onSaveClick.bind(this)}>
            Save
          </Button>
          &nbsp;&nbsp;
          <Button bsStyle="danger" onClick={this.onCancelClick.bind(this)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
