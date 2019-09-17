import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CitySearchBox from "./CitySearchBox";
import { useStoreState } from "easy-peasy";

const NAME_STYLE = {
  color: "black"
};
const NAV_STYLE = {
  color: "black"
};

export default function Header() {
  const g_selectedCity = useStoreState(state => state.selectedCity);
  const [bShowSearch, setbShowSearch] = useState(false);

  useEffect(() => {
    if (g_selectedCity.city !== "") {
      setbShowSearch(true);
    } else {
      setbShowSearch(false);
    }
  }, [g_selectedCity]);

  return (
    <div className="header">
      <Link to="/" style={NAME_STYLE}>
        <p>Fake-estate</p>
      </Link>
      {bShowSearch && <CitySearchBox />}
    </div>
  );
}
