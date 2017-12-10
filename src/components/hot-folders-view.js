import React from 'react';
import { Button } from 'react-bootstrap';

export default class HotFoldersView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            print_code: this.props.printcode
        };
    }


    onSaveClick() {
        
        this.props.saveClick(this.state.print_code);
    }

    onCancelClick() {
        this.props.cancelClick();
    }

    onHotFolderChange(event)
    {
        let pc = this.state.print_code;
        pc.hot_folder = event.target.value;
        this.setState({ print_code: pc });
    }


    render() {

        const print_code = this.state.print_code;
        
        return (

            <div className="page hotfolder-view">
                
                <h2>Hot folder</h2>
                        
                <div className="field-row">
                    <div className="fld fld1">Id</div>
                    <div className="fld fld2">{print_code.id}</div>
                </div>
                <div className="field-row">
                    <div className="fld fld1">Name</div>
                    <div className="fld fld2">{print_code.name}</div>
                </div>
                <div className="field-row">
                    <div className="fld fld1">Hot folder</div>
                    <div className="fld fld2"><input type="text" value={print_code.hot_folder} onChange={this.onHotFolderChange.bind(this)} /></div>
                </div>
                <div className="field-row" style={ {marginTop: "15px" }}>
                    <Button bsStyle="success" onClick={this.onSaveClick.bind(this)}>Save</Button>
                    <Button bsStyle="danger" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                </div>

            </div>
        )
    }
}