import React, { useEffect, useState } from "react";
import ResultGrid from "../layout/ResultGrid";
import MapDisplay from "../layout/MapDisplay";
import { useStoreState, useStoreActions } from "easy-peasy";
import Axios from "axios";
import SearchHeader from "../layout/SearchHeader";
import DetailsModul from "../layout/DetailsModul";

export default function MapSearch() {
  const g_searchFilters = useStoreState(state => state.searchFilters);
  const g_selectedCity = useStoreState(state => state.selectedCity);
  const g_setFilteredResults = useStoreActions(
    actions => actions.setFilteredResults
  );
  const g_setFullResults = useStoreActions(actions => actions.setFullResults);
  const g_fullResults = useStoreState(state => state.fullResults);
  const g_listingBeingViewed = useStoreState(state => state.listingBeingViewed);

  useEffect(() => {
    Axios.get("placeholderHouses.json")
      .catch(error => console.log(error))
      .then(res => {
        g_setFullResults(res.data.houses);
        g_setFilteredResults(res.data.houses);
      });
  }, [g_selectedCity]);

  useEffect(() => {
    if (g_fullResults.length > 0) {
      const filteredResults = g_fullResults.filter(house => {
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
      g_setFilteredResults(
        filteredResults.map((house, i) => ({ ...house, id: i }))
      );
    }
  }, [g_searchFilters, g_fullResults]);
  return (
    <div className="page">
      {g_listingBeingViewed && <DetailsModul />}
      <SearchHeader />
      <div className="mapSearchResult">
        <ResultGrid />
        <MapDisplay />
      </div>
    </div>
  );
}
