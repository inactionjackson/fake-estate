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
  const getRandomByRange = (min, max) => {
    return Math.max(Math.floor(Math.random() * max), min);
  };
  const randomizeHouse = house => {
    let sqf = getRandomByRange(300, 10000);
    let price = getRandomByRange(80000, 999999);
    let bdr = getRandomByRange(0, 7);
    let bth = getRandomByRange(1, 7);
    let garage = Math.random() > 0.5;

    return {
      addr: house.addr,
      imgs: house.imgs,
      thumb: house.thumb,
      sqf,
      price,
      bdr,
      bth,
      garage
    };
  };
  useEffect(() => {
    if (g_fullResults.length <= 0) {
      Axios.get("placeholderHouses.json")
        .catch(error => console.log(error))
        .then(res => {
          let randomizedHouses = res.data.houses.map(house => {
            return randomizeHouse(house);
          });
          g_setFullResults(randomizedHouses);
          g_setFilteredResults(randomizedHouses);
        });
    } else {
      let randomizedHouses = g_fullResults.map(house => {
        return randomizeHouse(house);
      });
      g_setFullResults(randomizedHouses);
      g_setFilteredResults(randomizedHouses);
    }
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
