import React, { Component } from 'react';
import Auto from './Autosuggest';
import './modal.css';

class AddNewJob extends Component {
    render() {
        return (
            <div className="modal__container">
                <header className="modal__header">ADD NEW JOBSITE</header>
                <div className="card">
                    <label className="modal__card__label">
                        <span>Name:</span>
                        <input type="text" placeholder="Type in name..." onChange={this.props.setName}/>
                    </label>
                    <div className="flex">
                        <label className="modal__card__label">
                            <span className="autosuggest__label">Category included:</span>
                            <Auto
                                categories={this.props.categories}
                                setCategory={this.props.setCategory} 
                                selectedCategories={this.props.selectedCategories}/>
                        </label>
                        <label className="modal__card__label">
                            <span>PM</span>
                           <select onChange={this.props.setPM}>
                               <option value='none'>
                                   --
                               </option>
                               <option value='Mike'>
                                   Mike
                               </option>
                           </select>
                        </label>
                    </div>
                    <button className="modal__button" onClick={this.props.save}>Save</button>
                </div>
            </div>
        )
    }
}

export default AddNewJob;
