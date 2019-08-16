import React, { useState, useEffect } from "react";
import Axios from "axios";

import AutoCompleteBox from "../AutoCompleteBox";

export default function Home() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [cityList, setCityList] = useState(null);

  //TODO: if selectedCity object is not set search for it and set it to closest match, then send to results page
  // maybe use easy peesy store for selectedCity instead of local state to make it easier to pass along and keep track of

  useEffect(() => {
    Axios.get("sorted_usaCities.json").then(res => {
      try {
        setCityList(res.data);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);
  const formatSelectedCity = () => {
    return selectedCity.city + " , " + selectedCity.state;
  };
  const onInputChange = e => {
    let value = e.target.value;
    if (formatSelectedCity !== value) {
      setSelectedCity({});
    }
    setSearchTerm(value);
    if (cityList && value.match(/^[a-zA-Z]+$/)) {
      let term = value;
      let termLen = term.length;
      let firstL = term[0].toUpperCase();
      setSuggestions(
        cityList[firstL].filter(
          entry =>
            entry.city.substring(0, termLen).toUpperCase() ===
            term.toUpperCase()
        )
      );
    } else {
      setSuggestions([]);
    }
  };
  const onSuggestionClicked = index => {
    let selection = suggestions[index];
    setSelectedCity(selection);
    setSearchTerm(selection.city + " , " + selection.state);
    setSuggestions([]);
  };

  return (
    <div className="homePage">
      <div className="homePageContent">
        <h1> Find Local Homes</h1>
        <div>
          <div style={{ display: "inline-block", position: "relative" }}>
            <input
              type="text"
              size="40"
              name="cityTerm"
              placeholder="listings in:"
              onChange={onInputChange}
              value={searchTerm}
            />

            {suggestions.length > 0 ? (
              <AutoCompleteBox
                clickHandler={onSuggestionClicked}
                suggestions={suggestions}
              />
            ) : (
              ""
            )}
          </div>
          <button name="citySearchSubmit">Search</button>
        </div>
      </div>
    </div>
  );
}
