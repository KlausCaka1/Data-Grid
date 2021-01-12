import React, {Component, useState } from 'react';
import './dataGrid.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const AgTable = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
     {Nr: 1, item: 'mattis', quantity: 13, description: 'primis in faucibus'},
     {Nr: 2, item: 'feils', quantity: 15, description: 'primis in faucibus'},
     {Nr: 3, item: 'commodo', quantity: 18, description: 'primis in faucibus'}
  ]);

  function onGridReady(params) {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
  }

   const onAddRow = () => {
        props.resetInputs();
        gridApi.updateRowData({
            add: [{Nr: props.Nr, item: props.Item, quantity: props.Quantity, description: props.Description}]
        })
  }

  return (
      
      <div className="ag-theme-alpine" style={{ height: 390, width: 'auto' }}>
          <button className="btn btn-primary mb-3" onClick={onAddRow}>Add Row</button>
          <AgGridReact
              onGridReady={onGridReady}
              rowData={rowData}>
              <AgGridColumn field="Nr"></AgGridColumn>
              <AgGridColumn sortable={ true } field="item"></AgGridColumn>
              <AgGridColumn sortable={ true } field="quantity"></AgGridColumn>
              <AgGridColumn field="description"></AgGridColumn>
          </AgGridReact>
      </div>
  );
};

class Grid extends Component {

    state = {
        nr: '', 
        item: '',
        quantity: '',
        description: '',
    }

    setNr = (event) => {
        this.setState({ nr: event.target.value})
    }

    setItem = (event) => {
        this.setState({ item: event.target.value});
    }

    setQuantity = (event) => {
        this.setState({ quantity: event.target.value});
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
        })
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.nr} onChange={this.setNr} placeholder="Type in Nr"/>
                    <input type="text" value={this.state.item} onChange={this.setItem} placeholder="Type in Item" />
                    <input type="text" value={this.state.quantity} onChange={this.setQuantity} placeholder="Type in Quantity" />
                    <input type="text" value={this.state.description} onChange={this.setDescription} placeholder="Type in Description"/>
                </div>
                <AgTable Nr={this.state.nr} Item={this.state.item} Quantity={this.state.quantity} Description={this.state.description} resetInputs={this.resetInputs}/>
            </div>
        )
    }
}

export default Grid;