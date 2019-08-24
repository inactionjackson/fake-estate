import React from "react";

export default function AutoCompleteBox({ suggestions, clickHandler }) {
  return (
    <ul className="autoCompleteBox">
      {suggestions.map((suggestion, index) => {
        return (
          <li
            className="suggestion"
            key={index}
            index={index}
            onClick={() => clickHandler(index)}
          >
            {suggestion.city} , {suggestion.state}
          </li>
        );
      })}
    </ul>
  );
}
