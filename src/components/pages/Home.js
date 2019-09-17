import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

import CitySearchBox from "../layout/CitySearchBox";

export default function Home() {
  const g_toMapSearch = useStoreState(state => state.toMapSearch);
  const g_setToMapSearch = useStoreActions(actions => actions.setToMapSearch);
  const g_resetSelectedCity = useStoreActions(
    actions => actions.resetSelectedCity
  );
  const [toMapSearch, setToMapSearch] = useState(false);

  useEffect(() => {
    g_resetSelectedCity();
  }, []);

  useEffect(() => {
    if (g_toMapSearch) {
      g_setToMapSearch(false);
      setToMapSearch(true);
    }
  }, [g_toMapSearch]);

  return toMapSearch ? (
    <Redirect to="/mapSearch" />
  ) : (
    <div className="page homePage">
      <div className="homePageContent">
        <h1> Find Local Homes</h1>
        <CitySearchBox />
      </div>
    </div>
  );
}
