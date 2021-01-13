import React, {Component, useState } from 'react';
import { render } from 'react-dom';
import './dataGrid.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AgModal from './agModal';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const re = /^[0-9\b]+$/;

class AgTable extends Component {

    state = {
        columnTypes: {
            valueColumn: {
              editable: true,
              aggFunc: 'sum',
              valueParser: 'Number(newValue)',
              cellClass: 'number-cell',
              cellRenderer: 'agAnimateShowChangeCellRenderer',
              filter: 'agNumberColumnFilter',
            },
            totalColumn: {
              cellRenderer: 'agAnimateShowChangeCellRenderer',
              cellClass: 'number-cell',
            },
        },
        totalColumn: {
            cellRenderer: 'agAnimateShowChangeCellRenderer',
            cellClass: 'number-cell',
          },
        autoGroupColumnDef: {
            headerName: 'Item(Group)',
            minWidth: 25,
        },
        rowData: [
          {Nr: 1, item: 'mattis', quantity: 13, description: 'primis in faucibus', update: 'Update', delete: 'x'},
          {Nr: 2, item: 'feils', quantity: 15, description: 'primis in faucibus', update: 'Update', delete: 'x'},
          {Nr: 3, item: 'commodo', quantity: 18, description: 'primis in faucibus', update: 'Update', delete: 'x'},
          {Nr: 4, item: 'feils', quantity: 20, description: 'primis in faucibus', update: 'Update', delete: 'x'},
       ],
       addRow: true,
       rowIndex: 0,
       
    }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  deletRow = (field) => {
      this.setState({
          rowData: this.state.rowData.filter(data => data !== field.data)
      })
  }

  setUpdate = (field) => {
    console.log(this.state.rowData.indexOf(field.data))
    this.setState({ 
        addRow: false,
        rowIndex: this.state.rowData.indexOf(field.data)
    })
    this.props.resetInputs();
  }

  updateRow = () => {
    this.setState({
        rowData: this.state.rowData.map((row, index) => {
            if (index === this.state.rowIndex) {
                return {
                    ...row,
                    Nr: this.props.Nr, 
                    item: this.props.Item, 
                    quantity: this.props.Quantity, 
                    description: this.props.Description,
                    update: "Update",
                    delete: "x",
                }
            } else {
                return row;
            }
        }),
        rowIndex: 0,
    })

    this.props.resetInputs();
  }

  closeModal = () => {
    this.props.resetInputs();
  }

  setCreate = () => {
    this.props.resetInputs();
    this.setState({ addRow: true })
  }

  sumQuantity = (params) => {
    var result = 0;
    params.values.forEach( function(value) {
        if (typeof value === 'number') {
            result += value;
        }
    });
    return result;
  }

  onAddRow = () => {
    this.gridApi.refreshClientSideRowModel('aggregate')
    let row = {Nr: this.props.Nr, item: this.props.Item, quantity: this.props.Quantity, description: this.props.Description, update: 'Update', delete: 'x'}
    this.setState({ rowData: [...this.state.rowData, row]})
    this.props.resetInputs();
}

  render() {
      return (
      
        <div className="ag-theme-alpine" style={{ height: 390, width: 'auto' }}>
            <button className="table__button" onClick={this.setCreate}>Add Row {this.state.addRow}</button>
            <AgGridReact
                suppressAggFuncInHeader={true}
                animateRows={true}
                columnTypes={this.state.columnTypes}
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                onGridReady={this.onGridReady}
                rowData={this.state.rowData}>
                <AgGridColumn field="Nr"></AgGridColumn>
                <AgGridColumn rowGroup={true} sortable={ true } field="item"></AgGridColumn>
                <AgGridColumn type="valueColumn" editable={true} enableValue={true} aggFunc={'sum'} sortable={ true } field="quantity"></AgGridColumn>
                <AgGridColumn field="description"></AgGridColumn>
                <AgGridColumn field="update" onCellClicked={this.setUpdate}></AgGridColumn>
                <AgGridColumn field="delete" onCellClicked={this.deletRow}></AgGridColumn>
            </AgGridReact>
            {this.props.showModal ? <AgModal
                                    addRow={this.state.addRow}
                                    updateRow={this.updateRow}
                                    onAddRow={this.onAddRow}
                                    closeModal={this.closeModal}
                                    Nr={this.props.Nr}
                                    setNr={this.props.setNr}
                                    Item={this.props.Item}
                                    setItem={this.props.setItem} 
                                    Quantity={this.props.Quantity}
                                    setQuantity={this.props.setQuantity} 
                                    Description={this.props.Description}
                                    setDescription={this.props.setDescription}/> : null}
        </div>
    );
  }

 

};

class Grid extends Component {

    state = {
        nr: '', 
        item: '',
        quantity: '',
        description: '',
        showModal: false,
    }

    setNr = (event) => {
        if (re.test(event.target.value) || event.target.value === '') {
            this.setState({ nr: event.target.value})
        }
    }

    setItem = (event) => {
        this.setState({ item: event.target.value});
    }

    setQuantity = (event) => {
        if (re.test(event.target.value) || event.target.value === '') {
            this.setState({ quantity: event.target.value});
        }
    }

    setDescription = (event) => {
        this.setState({ description: event.target.value})
    }

    resetInputs = () => {
        this.setState({
            nr: '', 
            item: '',
            quantity: '',
            description: '',
            rowData: [
                {Nr: 1, item: 'mattis', quantity: 13, description: 'primis in faucibus'},
                {Nr: 2, item: 'feils', quantity: 15, description: 'primis in faucibus'},
                {Nr: 3, item: 'commodo', quantity: 18, description: 'primis in faucibus'}],
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <div>
                <AgTable
                    rowData={this.state.rowData}
                    showModal={this.state.showModal}
                    Nr={this.state.nr}
                    setNr={this.setNr}
                    Item={this.state.item}
                    setItem={this.setItem} 
                    Quantity={this.state.quantity}
                    setQuantity={this.setQuantity} 
                    Description={this.state.description}
                    setDescription={this.setDescription} 
                    resetInputs={this.resetInputs}/>
            </div>
        )
    }
}

export default Grid;