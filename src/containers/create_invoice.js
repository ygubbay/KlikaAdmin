
import _ from 'lodash';
import React from 'react';

import { setTSList, newTS, removeTS } from '../actions/tsActions';
import Header from '../components/Header';
import TodoStats from '../components/todo-stats';
import TodoEntry from '../components/todo-entry';

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import * as api from '../api';

import TodoTable from '../components/todo-table';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';


export default class CreateInvoice extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            datePickerOpen: false,
            selectedDay: new Date(),
            todos: [],
            invoice_year_options: this.getInvoiceYearOptions(),
            invoice_year: (new Date()).getFullYear(),
            invoice_month_options: this.getInvoiceMonthOptions(),
            invoice_month: (new Date()).getMonth() + 1,
            project_options: [],
            projectid: 0,
            customer_id: 1,
            userid: 1
        }
    }

    componentWillMount() {
        this.readProjects(this.state.customer_id);
        this.getTodos();
    }

     componentWillReceiveProps(nextProps) {

      
        if (this.state.project_options.length == 0 && this.state.projects.length > 0)
        {
            this.setState({ project_options:  _.map(this.state.projects, this.getProjectOption) })
        }
    }

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    readProjects = (userid, month, year) => {

        const _this = this;

         const yr = year ? year: this.state.invoice_year;
        const mo = month ? month: this.state.invoice_month;
        const yyyyMM = '' + yr + this.pad(mo, 2);
        api.getProjectTodosInMonth(userid, yyyyMM).then((response) => {
            
            // default - first project will be selected

            let options = _.map(response.data, this.getProjectOption);
            let project_options = [ (<option key="0" value="0">[all projects]</option>)].concat(options)
            _this.setState({ projects: response.data, 
                                project_options: project_options,
                                project_id: 0 });
            //
        }).catch((err) => {
            console.log(err);
        });

        
    }


    getTodos = (projectid, month, year) => {

        const yr = year ? year: this.state.invoice_year;
        const mo = month ? month: this.state.invoice_month;
        const yyyyMM = '' + yr + this.pad(mo, 2);

        const _this = this;
        const project_id = projectid ? projectid: this.state.projectid;
        if (project_id == 0) {
            api.todosMonthly(yyyyMM).then((response) => {

                _this.setState({
                    todos: response.data
                })
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            api.todosProjectMonthly(project_id, yyyyMM).then((response) => {

                _this.setState({
                    todos: response.data
                })
            }).catch((err) => {
                console.log(err);
            });
        }
        
        
    }

    getProjectOption = (project) => {
  
      var is_selected = (this.state.projectid == project.projectid) ? {selected: true}: {};
      return (<option key={project.projectid} {...is_selected} value={project.projectid}>{project.projects[0].name}</option>);
    }


    handleDayClick = (day) => {
    
    this.setState({ 
      selectedDay: day
    })
    
  }

  handleDayPickerOpen() {
     this.setState( { datePickerOpen: !this.state.datePickerOpen})
  }


  getInvoiceYearOptions() {

      const options = [];
      const current_year = (new Date()).getFullYear();
      for (var i=current_year -2 ; i<current_year + 10; i++)
      {
          const option = (<option key={i} value={i}>{i}</option>);
          options.push(option);
      }
      return options;
      
  }

  getInvoiceMonthOptions() {
      const options = [];
      
        options.push(<option key="1" value="1">January</option>);
        options.push(<option key="2" value="2">February</option>);
        options.push(<option key="3" value="3">March</option>);
        options.push(<option key="4" value="4">April</option>);
        options.push(<option key="5" value="5">May</option>);
        options.push(<option key="6" value="6">June</option>);
        options.push(<option key="7" value="7">July</option>);
        options.push(<option key="8" value="8">August</option>);
        options.push(<option key="9" value="9">September</option>);
        options.push(<option key="10" value="10">October</option>);
        options.push(<option key="11" value="11">November</option>);
        options.push(<option key="12" value="12">December</option>);
      
      return options;
  }


 

    handleProjectChange(event) {

        const projectid = parseInt(event.target.value);
        this.setState({ projectid })
        this.readProjects(this.state.userid);
        this.getTodos(projectid, null, null);
    }

    handleMonthChange(event) {

        const month = parseInt(event.target.value);
        this.setState( {invoice_month: month})
        this.readProjects(this.state.userid, month, null);
        this.getTodos(null, month, null);
    }

    handleYearChange(event) {

        const year = parseInt(event.target.value);
        this.setState( { invoice_year: year});
        this.readProjects(this.state.userid, null, year);
        this.getTodos(null, null, year);
    }


    handleCreateClick(event) {

        alert('create invoice now');

        api.invoiceSave(0,
                        this.state.projectid,
                        this.state.selectedDay,
                        this.state.invoice_year,
                        this.state.invoice_month,
                        this.state.todos)
        .then((response) => {

            
            alert(response);
            alert('Need to get the new invoiceid and navigate to ViewInvoice (invoiceid)');
            // Need to get the new invoiceid and 
            // navigate to ViewInvoice (invoiceid)
        }).catch((err) => {
            alert(err);
        })
    }


    render() {

         const day_picker = this.state.datePickerOpen ? (
        
                <div className="day-picker-dd">
                    <DayPicker
                    defaultValue = { this.state.selectedDay  }
                    initialMonth={this.state.selectedDay}
                    selectedDays={ this.state.selectedDay }
                    onDayClick={ this.handleDayClick.bind(this) } />
                </div>): (<div></div>);

        return (

            <div>
                <h2>Create Invoice</h2>

                <div className="create-fields" style={{"marginBottom": "20px"}}>
                    <div className="col-xs-6 col-sm-4">
                        <div>
                            <label className="on-top">Project</label>
                            <select  onChange={this.handleProjectChange.bind(this)} className="create-select" value={this.state.projectid}>{this.state.project_options}</select>
                        </div>
                        <div>
                            <label className="on-top">Month</label>
                            <select onChange={this.handleMonthChange.bind(this)} className="create-select" value={this.state.invoice_month}>{this.state.invoice_month_options}</select>
                        </div>
                        <div>
                            <label className="on-top">Year</label>
                            <select onChange={this.handleYearChange.bind(this)}  className="create-select" value={this.state.invoice_year}>{this.state.invoice_year_options}</select>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4">
                        
                        <div>
                            <label className="on-top">Invoice Date</label>
                            <div className="create-daypicker">
                                <div>
                                    <div>
                                        <input className="invoice-day" type="text" value={this.state.selectedDay.toString().substr(0, 15)}  readOnly />
                                        <span id="open-daypicker">
                                            <Glyphicon style={{color: '#337ab7', fontSize: '1.3em', cursor: 'pointer'}} glyph={this.state.datePickerOpen ? "chevron-up": "chevron-down"} onClick={this.handleDayPickerOpen.bind(this)}  />
                                        </span>
                                    </div>
                                </div>

                                {day_picker}
            
                            </div>            
                        </div>
                        <div>
                            <label className="on-top">Payment Date</label>
                            <input type="text" readOnly className="readOnly" />
                        </div>
                        
                        <div>
                            <label className="on-top">User</label>
                            <select disabled></select>
                        </div>                   

                    </div>
                    <div style={{"clear": "both"}}></div>

                    <div style={{textAlign: "right"}}>
                        <button style={{marginRight: '50px', fontSize: '1.3em'}} onClick={this.handleCreateClick.bind(this)} className="btn btn-success">Create Invoice</button>
                    </div>
                </div>

                <TodoTable  todos={this.state.todos} 
                        is_date_col={true} 
                        is_project_col={true}
                        onRowDoubleClick={(todo) => {}} />
            </div>
        );
    }
}