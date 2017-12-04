import axios from "axios";

const config = require('../config.js');

function projectsGetAll(customerid) {
config.config.
    return axios.get(config.api_root + 'projects/' + customerid);    
}

function projectsGetActive(customerid) {

    return axios.get(config.api_root + 'projects/active/' + customerid);    
}

function getProjectTodosInMonth(userid, yyyyMM) {

    //http://localhost:9000/api/projects/todos/monthly/201701
    return axios.get(config.api_root + 'projects/todos/monthly/' + userid + '/' + yyyyMM);
}


function todosGetByDay(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/20110404
    return axios.get(config.api_root + 'todos/day/' + yyyyMMdd);
}

function todosGetDailyStats(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/stats/20170118
    return axios.get(config.api_root + 'todos/day/stats/' + yyyyMMdd);

}
function todosProjectMonthly(projectid, yyyyMM) {
    //http://localhost:9000/api/todos/monthly/45/201701
    return axios.get(config.api_root + 'todos/monthly/' + projectid + '/' + yyyyMM);
}

function todosMonthly(yyyyMM) {
    //http://localhost:9000/api/todos/monthly/201701
    return axios.get(config.api_root + 'todos/monthly/' + yyyyMM);
}


function todoSave(todo) {

    return axios.post(config.api_root + 'todos', todo);
}

function invoiceSave(invoiceid, 
                        projectid,
                        invoice_date,
                        invoice_year,
                        invoice_month,
                        todos
                        ) {

            const save_invoice = {
                header: {
                    invoiceid,
                    projectid,
                    invoice_date,
                    invoice_year,
                    invoice_month
                },
                todos: todos
            }

    return axios.post(config.api_root + 'invoices', save_invoice);
}


function invoiceTodosSave(invoiceid, todos) {

    return axios.post(config.api_root + 'invoiceentries', todos);
}


function invoiceGetHeader(invoiceid) {

    return axios.get(config.api_root + 'invoices/' + invoiceid + '/header');
}

function invoiceGetTodos(invoiceid) {

    return axios.get(config.api_root + 'invoices/' + invoiceid + '/todos');
}

function invoicesGetPaged(pageindex, pagesize) {

    return axios.get( config.api_root + 'invoices/' + pageindex + '/' + pagesize );
}


function todoDelete(tsentryid) {

    return axios.delete(config.api_root + 'todos/' + tsentryid);
}


function ordersGetPaged(pageindex, pagesize, statuses) 
{
    if (!statuses || statuses.length == 0)
    {
        return axios.get( config.api_root + 'orders/paged/' + pageindex + '/' + pagesize );
    }
    else 
    {
        const status_arr = statuses.map((value) => value.StatusId );
        const status_str = status_arr.join(',');
        return axios.get( config.api_root + 'orders/paged/' + pageindex + '/' + pagesize + '/' + status_str );
    }
}


function orderGetById(orderid) 
{
    return axios.get( config.api_root + 'orders/getbyid/' + orderid);
}


exports.orderGetByOrderNumber = (order_number) =>
{
    return axios.get( config.api_root + 'orders/getbynumber/' + order_number);
}


function getOrderStatuses() 
{
    return axios.get( config.api_root + 'orders/statuses' );
}


exports.getDailyOrders = (selected_day) => 
{
    return axios.get( config.api_root + 'orders/daily/' + selected_day );
}


function orderSave(order) 
{
    return axios.put( config.api_root + 'orders', { order: order });
}

function saveTrackingNumber(order_number, tracking_number) 
{
    return axios.post( config.api_root + 'orders/tracking', { order_number: order_number, tracking_number: tracking_number });
}


function orderPrint(orderid)
{
    return axios.get( config.api_root + 'orders/pdf/orderid/' + orderid);
}


exports.login = (email, password) => {

    return axios.post( config.api_root + 'users/login', { email: email, password: password });
}


export { ordersGetPaged, getOrderStatuses, orderGetById, orderSave, orderPrint, saveTrackingNumber };