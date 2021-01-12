import React, { Component } from 'react';
import './dataGrid.css';
import Grid from './agTable';
  

class Table extends Component {

  renderCategories = () => {
    return this.props.location.state.categories.map(category => {
      console.log(category);
      return (
        <div>{category.name}</div>
      );
    })
  }

  render() {


    return (
      <div className="dataGrid__container">
         <div className="name__card">
             <span className="dataGrid__name">{this.props.location.state.name}</span>
             CATEGORIES
             <div className="card__category">
                {this.renderCategories()}
             </div>
         </div>
         <div className="dataGrid__card">
             <span className="table__header">DATA GRID</span>
             <div style={{ height: 500, width: '100%' }}>
               <Grid/>
            </div>
         </div>
      </div>
  )
  }

}

export default Table;