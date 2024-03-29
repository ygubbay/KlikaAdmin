import axios from "axios";

//const config = require('../config.js');
let config;

if (DEVELOPMENT) config = require("../config.js");
else config = require("../config.production.js");

function ordersGetPaged(pageindex, pagesize, statuses) {
  if (!statuses || statuses.length == 0) {
    return axios.get(
      config.api_root + "orders/paged/" + pageindex + "/" + pagesize
    );
  } else {
    const status_arr = statuses.map(value => value.StatusId);
    const status_str = status_arr.join(",");
    return axios.get(
      config.api_root +
        "orders/paged/" +
        pageindex +
        "/" +
        pagesize +
        "/" +
        status_str
    );
  }
}

exports.usersGetPaged = (pageindex, pagesize) => {
  return axios.get(
    config.api_root + "users/paged/" + pageindex + "/" + pagesize
  );
};

function orderGetById(orderid) {
  return axios.get(config.api_root + "orders/getbyid/" + orderid);
}

exports.orderGetByOrderNumber = order_number => {
  return axios.get(config.api_root + "orders/getbynumber/" + order_number);
};

function getOrderStatuses() {
  return axios.get(config.api_root + "orders/statuses");
}

exports.getDailyOrders = selected_day => {
  return axios.get(config.api_root + "orders/daily/" + selected_day);
};

function orderSave(order) {
  return axios.put(config.api_root + "orders", { order: order });
}

function saveTrackingNumber(order_number, tracking_number) {
  return axios.post(config.api_root + "orders/tracking", {
    order_number: order_number,
    tracking_number: tracking_number
  });
}

exports.ordersDailyPdf = yyyymmdd => {
  return axios.get(config.api_root + "orders/pdf/daily/" + yyyymmdd);
};

// Invoice pdf
exports.CreateInvoicePdf = (yyyymm, extra_info) => {
  console.log("yyyymm: |" + yyyymm + "|\textra_info: |" + extra_info + "|");
  return axios.get(
    config.api_root + "invoice/pdf/" + yyyymm + "/" + extra_info
  );
};

function orderPrint(orderid) {
  return axios.get(config.api_root + "orders/pdf/orderid/" + orderid);
}

exports.login = (email, password) => {
  return axios.post(config.api_root + "users/login", {
    email: email,
    password: password
  });
};

exports.resetPassword = email => {
  return axios.post(config.api_root + "users/resetpassword", { email, email });
};

exports.getChangePassword = token => {
  return axios.get(config.api_root + "users/changepassword/" + token);
};

exports.changePassword = (token, password) => {
  return axios.post(config.api_root + "users/changepassword", {
    token: token,
    password: password
  });
};

exports.getPrintCodesPaged = (page_index, page_size) => {
  return axios.get(
    config.api_root + "printcodes/" + page_index + "/" + page_size
  );
};

exports.savePrintCode = print_code => {
  return axios.put(config.api_root + "printcodes", print_code);
};

export {
  ordersGetPaged,
  getOrderStatuses,
  orderGetById,
  orderSave,
  orderPrint,
  saveTrackingNumber
};
