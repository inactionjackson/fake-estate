import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function SearchHeader() {
  const searchFilters = useStoreState(state => state.searchFilters);
  const setMinPrice = useStoreActions(actions => actions.setMinPrice);

  const onMinPricechanged = e => {
    setMinPrice(e.target.value);
  };
  return (
    <div className="searchHeader">
      <div className="searchInputContainer">
        Price :
        <input type="text" placeholder="Min" />
        <input type="text" placeholder="Max" />
      </div>
      <div className="searchInputContainer">
        Bedrooms :
        <input type="text" placeholder="Min" />
      </div>
      <div className="searchInputContainer">
        Bathrooms :
        <input type="text" placeholder="Min" />
      </div>
      <div className="searchInputContainer">
        Sqft :
        <input type="text" placeholder="Min" />
      </div>
      <div className="searchInputContainer">
        <label for="hasGarage">Garage Required:</label>
        <input type="checkbox" id="hasGarage" name="hasGarage" />
      </div>
    </div>
  );
}
