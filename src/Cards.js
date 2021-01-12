import React, {Component} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';


const Card = ({name, categories}) => {
    return (
        <div className="card">
            <div className="card__header">
                <span className="card__span__left">JOB SITE NAME</span>
                <span className="card__span__right">STATUS</span>
            </div>
            <div className="card__bottom">
                <Link className="card__span__left card__name" 
                to={{
                    pathname: "/table",
                    state: {
                        name: name,
                        categories: categories
                    }
                  }}>
                    {name}
                </Link>
                <span className="card__span__right">Pending</span>
            </div>
        </div>
    )
}

export default class Cards extends Component {

    state = {
        cards: this.props.cards,
    }

    renderCards = () => {
        return this.state.cards.map((card, index) => {
            return (
                <Draggable
                index={index}
                key={index}
                draggableId={index.toString()}> 
                    {(provided, snapshot) => (
                        <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                            <Card  name={card.job_site_name} categories={card.categories} />
                        </div>
                    )}
                </Draggable>
            )
        })
    }

    reorder = (list, startIndex, endIndex) => {
        const results = Array.from(list);
        const [removed] = results.splice(startIndex, 1)
        results.splice(endIndex, 0, removed);

        return results
    }

    onEnd = (result) => {
        this.setState({ 
            cards: this.reorder(this.state.cards, result.source.index, result.destination.index)
        })
    }

    render() {
        return (
            <DragDropContext className="cards" onDragEnd={this.onEnd}>
                <Droppable droppableId="1234567">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} class="nav">
                            {this.renderCards()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}