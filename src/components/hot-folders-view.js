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
        
        const pc = this.state.print_code;
        pc.hot_folder_book = pc.hot_folder_book ? pc.hot_folder_book: '';
        pc.hot_folder_cover = pc.hot_folder_cover ? pc.hot_folder_cover: '';
        pc.is_cover = pc.is_cover == null ? 0: (pc.is_cover ? 1: 0);
        if (pc.is_cover != 1)
        {
            pc.hot_folder_cover = '';
        }

        this.props.saveClick(this.state.print_code);
    }

    onCancelClick() {
        this.props.cancelClick();
    }

    onBookHotFolderChange(event)
    {
        let pc = this.state.print_code;
        pc.hot_folder_book = event.target.value;
        this.setState({ print_code: pc });
    }

    onCoverHotFolderChange(event)
    {
        let pc = this.state.print_code;
        pc.hot_folder_cover = event.target.value;
        this.setState({ print_code: pc });
    }


    onIsCoverChange(event) 
    {
        let pc = this.state.print_code;
        pc.is_cover = event.target.checked ? 1: 0;
        this.setState({ print_code: pc });

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
                    <div className="fld fld2"><input type="text" value={print_code.hot_folder_book} onChange={this.onBookHotFolderChange.bind(this)} /></div>
                </div>
                <div className="field-row">
                    <div className="fld fld1">Is Cover Hot folder:</div>
                    <div className="fld fld2"><input type="checkbox" checked={print_code.is_cover==1} onChange={this.onIsCoverChange.bind(this)} /></div>
                </div>

                <div className="field-row">
                    <div className="fld fld1">Cover Hot folder:</div>
                    <div className="fld fld2"><input type="text" disabled={print_code.is_cover != 1} value={print_code.hot_folder_cover} onChange={this.onCoverHotFolderChange.bind(this)} /></div>
                </div>
                <div className="field-row" style={ {marginTop: "15px" }}>
                    <Button bsStyle="success" onClick={this.onSaveClick.bind(this)}>Save</Button>&nbsp;&nbsp;
                    <Button bsStyle="danger" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                </div>

            </div>
        )
    }
}