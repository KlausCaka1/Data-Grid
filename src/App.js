import './App.css';
import React, {Component} from 'react';
import AddNewJob from "./modal/AddNewJob";
import Cards from "./Cards";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Redirect
  } from "react-router-dom";
import Table from './dataGrid/dataGrid.js';

var categories = [
    {
      name: 'Shoring',
  
    },
    {
      name: 'System Scaffold',
    },
    {
        name: 'Shed'
    },
    {
        name: 'Pipeline'
    }
];

const categories__backup = [
    {
        name: 'Shoring',
    
      },
      {
        name: 'System Scaffold',
      },
      {
          name: 'Shed'
      },
      {
          name: 'Pipeline'
      } 
]

const NoCards = () => {
    return (
        <div className="cards">
            No Cards
        </div>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

class App extends Component {
    state = {
        showModal: false,
        cards: [],
        name: '',
        category: '',
        categories: [],
        pm: 'none'
    }

    setName = (event) => {
        this.setState({name: event.target.value})
    }

    setCategory = (event, {suggestionValue, suggestion}) => {
        this.setState({
            categories: [
                ...this.state.categories,
                {
                    name: suggestionValue,
                    
                },
            ],
        });
        categories.splice(categories.indexOf(suggestion), 1)
    }

    setPM = (event) => {
        this.setState({pm: event.target.value})
    }

    saveModal = () => {
        this.setState({
            showModal: !this.state.showModal,
            cards: [...this.state.cards,
                {
                    job_site_name: this.state.name,
                    categories: this.state.categories,
                    pm: this.state.pm
                }
            ],
            name: '',
            categories: [],
            pm: 'none',
        });
        categories = categories__backup
    }


    render() {


        return (
            <div className="container">
                <headr className="header">
                    <span>INVENTORY</span>
                    <button className="header__button">Logout</button>
                </headr>
                {this.state.showModal ?
                    <AddNewJob
                        setCategory={this.setCategory}
                        setPM={this.setPM}
                        setName={this.setName}
                        categories={categories}
                        selectedCategories={this.state.categories}
                        save={this.saveModal}/> :
                        <Router className="body">
                            <nav>
                            </nav>
                        <Switch>
                            <Route exact  path='/' render={() => <Redirect to="/cards"/>}>
                            </Route>
                            <Route exact  path='/cards'>
                                <div className="body">
                                    {this.state.cards.length > 0 ? <Cards cards={this.state.cards}/> : <NoCards/>}
                                    <button className="button" onClick={() => this.setState({showModal: !this.state.showModal})}>
                                        Create
                                    </button>
                                </div>
                            </Route>
                            
                            <Route exact  path='/table' component={Table}>
                            </Route>
                        </Switch>
                    </Router>
                }
            </div>
        );
    }
}

export default App;
