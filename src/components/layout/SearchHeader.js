import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import ButtonWithDropdown from "./ButtonWithDropdown";
import { Formatters as F } from "../Formatters";

export default function SearchHeader() {
  const g_setMinPrice = useStoreActions(actions => actions.setMinPrice);
  const g_setMaxPrice = useStoreActions(actions => actions.setMaxPrice);
  const g_setMinBdr = useStoreActions(actions => actions.setMinBdr);
  const g_setMinBath = useStoreActions(actions => actions.setMinBath);
  const g_setMinSqft = useStoreActions(actions => actions.setMinSqft);
  const g_togglebHasGarage = useStoreActions(
    actions => actions.togglebHasGarage
  );
  const g_filteredResults = useStoreState(state => state.filteredResults);
  //TODO: style bar better

  return (
    <div className="searchHeader">
      <ButtonWithDropdown
        placeholder="Min Price"
        min={20000}
        max={1000000}
        stepSize={50000}
        g_onSelected={g_setMinPrice}
        valueFormatter={F.price}
      />
      {" <=> "}
      <ButtonWithDropdown
        placeholder="Max Price"
        min={20000}
        max={1000000}
        stepSize={50000}
        g_onSelected={g_setMaxPrice}
        valueFormatter={F.price}
        id={0}
      />
      <ButtonWithDropdown
        placeholder="Beds"
        min={0}
        max={7}
        stepSize={1}
        g_onSelected={g_setMinBdr}
        valueFormatter={F.bed}
        id={1}
      />
      <ButtonWithDropdown
        placeholder="Baths"
        min={0}
        max={7}
        stepSize={1}
        g_onSelected={g_setMinBath}
        valueFormatter={F.bath}
        id={2}
      />
      <ButtonWithDropdown
        placeholder="Sq.Ft."
        min={300}
        max={12000}
        stepSize={300}
        g_onSelected={g_setMinSqft}
        valueFormatter={F.sqft}
        id={3}
      />
      <label htmlFor="hasGarage">Garage Required:</label>
      <input
        type="checkbox"
        id="hasGarage"
        name="hasGarage"
        onClick={g_togglebHasGarage}
      />
      <p className="resultsCount">
        {g_filteredResults ? g_filteredResults.length : 0} Results Found
      </p>
    </div>
  );
}
