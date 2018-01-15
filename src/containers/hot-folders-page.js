
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';
import HotFoldersTable from '../components/hot-folders-table';
import HotFoldersView from '../components/hot-folders-view';


import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class HotFoldersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            pagesize: 10, 
            orders: [],
            single_view: false,
            single_printcode: {},  
            paging: {
                total: 10,
                current: 0
            }
        }
  
    }

    componentWillMount() {

        if (!this.props.user.login)
            this.props.history.push('/login');
        this.getPrintCodes(this.state.paging.current+1, this.state.pagesize);
    }


    handlePageChanged(page) {
        
        const paging = {...this.state.paging };
        paging.current = page;
        this.setState({ paging });
        this.getPrintCodes(page+1, this.state.pagesize);

    }

    getPrintCodes(pageindex, pagesize) {
        api.getPrintCodesPaged(pageindex, pagesize).then((response) => {


            console.log('getPrintCodesPaged response:', response);
            let paging = this.state.paging;
            paging.total = parseInt(response.data.count / this.state.pagesize);
            paging.all_rows = response.data.count;
            this.setState({ printcodes: response.data.rows, paging: paging });

        }).catch((err) => {
            alert(err);
        })
    }

    editPrintCode(printcode)
    {
        console.log('editPrintCode', printcode);
        this.setState({ single_view: true, single_printcode: printcode });        
    }

    savePrintCode(printcode) 
    {
        api.savePrintCode(printcode).then((response) => {

            this.getPrintCodes(this.state.paging.current+1, this.state.pagesize);
        })
        this.setState( { single_view: false, single_printcode: null});
    }

    cancelPrintCode() 
    {
        this.setState( { single_view: false, single_printcode: null});
    }

    render() {

        var display;
        
        if (!this.state.single_view) {
            display =  (<div>

                            <h2>Hot folders</h2>                
                            <HotFoldersTable printcodes={this.state.printcodes} editClick={(printcode) => {this.editPrintCode(printcode)} } />
                            <Pager 
                                total = {this.state.paging.total} 
                                current={this.state.paging.current}
                                onSkipTo={this.handlePageChanged.bind(this)}
                                />
                        </div>);
        }
        else {
            display = (<div>
                        <HotFoldersView printcode={this.state.single_printcode} 
                                        saveClick={(printcode) => {this.savePrintCode(printcode)}}
                                        cancelClick={() => {this.cancelPrintCode()}} />
                    </div>);
        }        
        return (

            <div className="ts-page">
                
                <Header />
                {display}
            </div>
        );
    }
}

   
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(HotFoldersPage);


