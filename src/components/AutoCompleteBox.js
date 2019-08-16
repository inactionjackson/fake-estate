import React from "react";

export default function AutoCompleteBox({ suggestions, clickHandler }) {
  const LIST_LIMIT = 6;
  const onSuggestionClicked = index => {
    clickHandler(index);
  };
  return (
    <ul className="autoCompleteBox">
      {suggestions.map((suggestion, index) => {
        return index >= LIST_LIMIT ? (
          ""
        ) : (
          <li
            key={index}
            index={index}
            onClick={() => onSuggestionClicked(index)}
          >
            {suggestion.city} , {suggestion.state}{" "}
          </li>
        );
      })}
    </ul>
  );
}
