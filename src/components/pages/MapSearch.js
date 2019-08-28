import React, { useEffect, useState } from "react";
import ResultGrid from "../layout/ResultGrid";
import MapDisplay from "../layout/MapDisplay";
import { useStoreState, useStoreActions } from "easy-peasy";
import Axios from "axios";
import SearchHeader from "../layout/SearchHeader";

export default function MapSearch() {
  const g_searchFilters = useStoreState(state => state.searchFilters);
  const g_selectedCity = useStoreState(state => state.selectedCity);
  const g_setFilteredResults = useStoreActions(
    actions => actions.setFilteredResults
  );
  const [fullResults, setFullResults] = useState(null);
  useEffect(() => {
    Axios.get("placeholderHouses.json")
      .catch(error => console.log("BAD", error))
      .then(res => setFullResults(res.data.houses));
    //TODO: get geolocation data and set up map
  }, [g_selectedCity]);

  useEffect(() => {
    if (fullResults) {
      const filteredResults = fullResults.filter(house => {
        const doesGarageMatch =
          !g_searchFilters.bHasGarage ||
          (g_searchFilters.bHasGarage && house.garage);

        return (
          house.sqf >= g_searchFilters.minSqft &&
          house.bdr >= g_searchFilters.minBdr &&
          house.bth >= g_searchFilters.minBath &&
          house.price >= g_searchFilters.minPrice &&
          house.price <= g_searchFilters.maxPrice &&
          doesGarageMatch
        );
      });
      console.log(filteredResults);
      g_setFilteredResults(filteredResults);
    }
  }, [g_searchFilters]);
  return (
    <div className="page">
      <SearchHeader />
      <div className="mapSearchResult">
        <ResultGrid />
        <MapDisplay />
      </div>
    </div>
  );
}
