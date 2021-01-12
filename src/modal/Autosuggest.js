import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestions = (value, categories) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : categories.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selectedSuggestion: [],
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.categories)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  showSelectedSuggestions = () => {
      return this.props.selectedCategories.map((suggestion, index) => {
          return (
              <span key={index} className="autosuggest__text">
                  {suggestion.name}
              </span>
          );
      })
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a category',
      value,
      onChange: this.onChange,
      className: 'autosuggest__input'
    };

    return (
        <div>
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={this.props.setCategory}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            />
            {this.showSelectedSuggestions()}
        </div>
      
    );
  }
}

export default Example;
