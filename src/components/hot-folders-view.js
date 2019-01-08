import React from "react";
import { Button } from "react-bootstrap";

export default class HotFoldersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      print_code: this.props.printcode

      // Pricing fields
      //base_price: "",
      // base_pages: "",
      // addon_price: "",
      // addon_pages: "",
      // box_price: "",
      // copies_per_box: "",
      // packaging_price: ""
    };
  }

  onSaveClick() {
    if (!this.pricesValid()) {
      console.log("pricing not valid");
      // add error alert (maybe through reducer)
      return;
    }
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

    console.log("What the state: ");
    console.log(this.state);
    console.log("ok");

    this.props.saveClick(this.state.print_code);
  }

  onCancelClick() {
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
    console.log("event.target.name: |" + event.target.name + "|");
    console.log("event.target.value: |" + event.target.value + "|");

    const name = event.target.name;
    const value = event.target.value;
    let new_state = this.state;
    new_state[name] = value;
    this.setState(new_state);
  }

  // addPricesToPC() {
  //   let pc = this.state.print_code;

  //   //pc.base_price = this.state.base_price;
  //   pc.base_pages = this.state.base_pages;
  //   pc.addon_price = this.state.addon_price;
  //   pc.addon_pages = this.state.addon_pages;
  //   pc.box_price = this.state.box_price;
  //   pc.copies_per_box = this.state.copies_per_box;
  //   pc.packaging_price = this.state.packaging_price;

  //   this.setState({ print_code: pc });
  // }

  isValidPrice(price_field, price_value) {
    const price = parseFloat(price_value);

    // Non desimal was entered:
    if (isNaN(price)) {
      console.log("price input not a number");
      // alert invalid input price
      return false;
    }
    if (price < 0) {
      console.log("price is non-positive");
      // alert invalid input price
      return false;
    }
    // Maybe check int/float
    return true;
  }

  pricesValid() {
    console.log("state before: " + this.state.print_code);
    const all_prices = Object.assign({}, this.state);
    delete all_prices.print_code;
    console.log("state after: " + this.state.print_code);
    for (const price in all_prices) {
      console.log("key: " + price + "\tvalue: " + all_prices[price]);
      if (!this.isValidPrice(price, all_prices[price])) {
        // show invalid alerts
        return false;
      }
    }
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
              <input
                type="text"
                className="hotfolder-text"
                name="base_price"
                value={this.state.print_code.base_price}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Base pages:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="base_pages"
                value={this.state.print_code.base_pages}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Addon price:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="addon_price"
                value={this.state.print_code.addon_price}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Addon pages:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="addon_pages"
                value={this.state.print_code.addon_pages}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Box price:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="box_price"
                value={this.state.print_code.box_price}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Copies per box:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="copies_per_box"
                value={this.state.print_code.copies_per_box}
                onChange={event => this.onPricingChange(event)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="fld fld1">Packaging price:</div>
            <div className="fld fld2">
              <input
                type="text"
                className="hotfolder-text"
                name="packaging_price"
                value={this.state.print_code.packaging_price}
                onChange={event => this.onPricingChange(event)}
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
