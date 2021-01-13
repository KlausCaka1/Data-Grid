import React from 'react';

const AgModal = (props) => {
    return (
        <div className="ag__modal">
            <span className="ag__modal__title">Add New Row</span>
            <div className="ag__modal__body">
                <input className="ag__modal__item" type="text" value={props.Nr} onChange={props.setNr} placeholder="Type in Nr" />
                <input className="ag__modal__item" type="text" value={props.Item} onChange={props.setItem} placeholder="Type in Item"/>
                <input className="ag__modal__item" type="text" value={props.Quantity} onChange={props.setQuantity} placeholder="QuantityType in Quantity"/>
                <input className="ag__modal__item" type="text" value={props.Description} onChange={props.setDescription} placeholder="DescriptionType in Description"/>
            </div>
            <div className="ag__modal__buttons">
                <button className="ag__modal__button" onClick={props.closeModal}>Close</button>
                {props.addRow ? 
                    <button className="ag__modal__button" onClick={props.onAddRow}>Add Row</button> : 
                    <button className="ag__modal__button" onClick={props.updateRow}>Update Row</button>}
                
            </div>
        </div>
    )
}

export default AgModal;