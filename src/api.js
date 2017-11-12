import axios from "axios";

const api_root = "http://localhost:9090/api/";

function projectsGetAll(customerid) {

    return axios.get(api_root + 'projects/' + customerid);    
}

function projectsGetActive(customerid) {

    return axios.get(api_root + 'projects/active/' + customerid);    
}

function getProjectTodosInMonth(userid, yyyyMM) {

    //http://localhost:9000/api/projects/todos/monthly/201701
    return axios.get(api_root + 'projects/todos/monthly/' + userid + '/' + yyyyMM);
}


function todosGetByDay(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/20110404
    return axios.get(api_root + 'todos/day/' + yyyyMMdd);
}

function todosGetDailyStats(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/stats/20170118
    return axios.get(api_root + 'todos/day/stats/' + yyyyMMdd);

}
function todosProjectMonthly(projectid, yyyyMM) {
    //http://localhost:9000/api/todos/monthly/45/201701
    return axios.get(api_root + 'todos/monthly/' + projectid + '/' + yyyyMM);
}

function todosMonthly(yyyyMM) {
    //http://localhost:9000/api/todos/monthly/201701
    return axios.get(api_root + 'todos/monthly/' + yyyyMM);
}


function todoSave(todo) {

    return axios.post(api_root + 'todos', todo);
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

    return axios.post(api_root + 'invoices', save_invoice);
}


function invoiceTodosSave(invoiceid, todos) {

    return axios.post(api_root + 'invoiceentries', todos);
}


function invoiceGetHeader(invoiceid) {

    return axios.get(api_root + 'invoices/' + invoiceid + '/header');
}

function invoiceGetTodos(invoiceid) {

    return axios.get(api_root + 'invoices/' + invoiceid + '/todos');
}

function invoicesGetPaged(pageindex, pagesize) {

    return axios.get( api_root + 'invoices/' + pageindex + '/' + pagesize );
}


function todoDelete(tsentryid) {

    return axios.delete(api_root + 'todos/' + tsentryid);
}


function ordersGetPaged(pageindex, pagesize, statuses) 
{
    if (!statuses || statuses.length == 0)
    {
        return axios.get( api_root + 'orders/paged/' + pageindex + '/' + pagesize );
    }
    else 
    {
        const status_arr = statuses.map((value) => value.StatusId );
        const status_str = status_arr.join(',');
        return axios.get( api_root + 'orders/paged/' + pageindex + '/' + pagesize + '/' + status_str );
    }
}


function orderGetById(orderid) 
{
    return axios.get( api_root + 'orders/getbyid/' + orderid);
}


function getOrderStatuses() 
{
    return axios.get( api_root + 'orders/statuses' );
}


export { ordersGetPaged, getOrderStatuses, orderGetById };