import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import Axios from "axios";

import AutoCompleteBox from "../layout/AutoCompleteBox";

export default function Home() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityList, setCityList] = useState(null);
  const [toMapSearch, setToMapSearch] = useState(false);

  const g_SetSelectedCity = useStoreActions(actions => actions.setSelectedCity);

  //TODO: change search input into component to re-use in header on other pages

  useEffect(() => {
    Axios.get("sorted_usaCities.json")
      .catch(error => console.log("BAD", error))
      .then(res => setCityList(res.data));
  }, []);

  const formatCityObj = obj => {
    return obj.city + " , " + obj.state;
  };

  const findCityByTerm = term => {
    //FIXME: make work when state is typed as well
    // seperate by space or comma and test each term vs city and state
    term = term.toUpperCase();
    let termLen = term.length;
    let firstL = term[0];
    return (
      cityList[firstL].filter(
        entry => entry.city.substring(0, termLen).toUpperCase() === term
      ) || []
    );
  };

  const onInputChange = e => {
    let term = e.target.value;
    if (selectedCity && formatCityObj(selectedCity) !== term) {
      setSelectedCity(null);
    }
    setSearchTerm(term);
    if (cityList && term.match(/^[a-zA-Z ]+$/)) {
      setSuggestions(findCityByTerm(term));
    } else {
      setSuggestions([]);
    }
  };

  const inputRef = React.createRef();
  const onSuggestionClicked = index => {
    let selection = suggestions[index];
    setSelectedCity(selection);
    setSearchTerm(formatCityObj(selection));
    setSuggestions([]);
    inputRef.current.focus();
  };

  const listenForSubmit = e => {
    if (e.key === "Enter") {
      let bestMatch = selectedCity;
      if (!bestMatch) {
        const matchingCities = findCityByTerm(searchTerm);
        if (matchingCities.length > 0) {
          bestMatch = matchingCities[0];
        } else {
          alert("no matching cities found");
        }
      }
      if (bestMatch) {
        g_SetSelectedCity(bestMatch);
        setToMapSearch(true);
      }
    }
  };
  return toMapSearch ? (
    <Redirect to="/mapSearch" />
  ) : (
    <div className="page homePage">
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
              onKeyPress={listenForSubmit}
              value={searchTerm}
              ref={inputRef}
            />

            {suggestions.length > 0 && (
              <AutoCompleteBox
                clickHandler={onSuggestionClicked}
                suggestions={suggestions}
              />
            )}
          </div>
          <button
            name="citySearchSubmit"
            onClick={() => listenForSubmit({ key: "Enter" })}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
