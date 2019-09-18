import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Axios from "axios";

import AutoCompleteBox from "./AutoCompleteBox";

export default function CitySearchBox() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityList, setCityList] = useState(null);
  const g_setToMapSearch = useStoreActions(actions => actions.setToMapSearch);
  const g_selectedCity = useStoreState(state => state.selectedCity);
  const g_SetSelectedCity = useStoreActions(actions => actions.setSelectedCity);

  const formatCityObj = obj => {
    return obj.city + " , " + obj.state;
  };
  useEffect(() => {
    if (g_selectedCity.city !== "") {
      setSearchTerm(formatCityObj(g_selectedCity));
    }
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    Axios.get("sorted_usaCities.json", { cancelToken: source.token })
      .then(res => setCityList(res.data))
      .catch(error => console.log(error));

    return () => {
      source.cancel("CitySearchBox component unmounted");
    };
  }, []);

  const findCityByTerm = term => {
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
  const focusHandler = () => {
    inputRef.current.select();
  };
  const listenForSubmit = e => {
    if (e.key === "Enter" && searchTerm) {
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
        g_setToMapSearch(true);
      }
    }
  };
  return (
    <>
      {suggestions.length > 0 && (
        <div
          className="clickCapture"
          onClick={() => {
            setSuggestions([]);
          }}
        ></div>
      )}
      <div className="citySearchBox">
        <div style={{ display: "inline-block", position: "relative" }}>
          <input
            type="text"
            size="40"
            name="cityTerm"
            placeholder="listings in:"
            onChange={onInputChange}
            onKeyPress={listenForSubmit}
            onFocus={focusHandler}
            onClick={focusHandler}
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
    </>
  );
}
