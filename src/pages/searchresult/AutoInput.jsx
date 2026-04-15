import './searchresult.css'
import { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import theme from './theme.module.css'
// https://github.com/moroshko/react-autosuggest#installation

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) return [];

  return data.filter(
    (element) =>
      element.name.toLowerCase().includes(inputValue)
  );
};

const getSuggestionValue = (suggestion) => {

  return suggestion?.name ?? "";
};

const renderSuggestion = (suggestion) => (
  <div>{suggestion.name}</div>
);

const AutoInput = ({ value, onChange, placeholder, inputStyle, data}) => {
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, data));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder,
    value: value ?? "",
    onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
	  theme={theme}
    />
  );
}

export default AutoInput;
