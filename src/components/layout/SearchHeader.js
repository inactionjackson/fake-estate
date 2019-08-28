import React from "react";
import { useStoreActions } from "easy-peasy";
import ButtonWithDropdown from "./ButtonWithDropdown";

export default function SearchHeader() {
  const g_setMinPrice = useStoreActions(actions => actions.setMinPrice);
  const g_setMaxPrice = useStoreActions(actions => actions.setMaxPrice);
  const g_setMinBdr = useStoreActions(actions => actions.setMinBdr);
  const g_setMinBath = useStoreActions(actions => actions.setMinBath);
  const g_setMinSqft = useStoreActions(actions => actions.setMinSqft);
  const g_togglebHasGarage = useStoreActions(
    actions => actions.togglebHasGarage
  );
  //TODO: style bar better

  const numberFormatter = num => {
    if (parseInt(num) > 0) {
      num = num.toString();
      let index = num.length - 3;
      while (index > 0) {
        num = num.substring(0, index) + "," + num.substring(index);
        index -= 3;
      }
    }
    return num;
  };
  const priceFormatter = price => {
    if (parseInt(price) > 0) {
      price = numberFormatter(price);
      price = "$" + price;
    }
    return price;
  };
  const bedFormatter = bdrms => {
    if (parseInt(bdrms) >= 0) {
      bdrms += "+ Beds";
    }
    return bdrms;
  };
  const bathFormatter = baths => {
    if (parseInt(baths) > 0) {
      baths += "+ Baths";
    }
    return baths;
  };
  const sqftFormatter = sqfts => {
    if (parseInt(sqfts) > 0) {
      sqfts = numberFormatter(sqfts);
      sqfts += "+ sq.ft.";
    }
    return sqfts;
  };

  return (
    <div className="searchHeader">
      <div className="searchInputContainer">
        <ButtonWithDropdown
          placeholder="Min Price"
          min={20000}
          max={1000000}
          stepSize={50000}
          g_onSelected={g_setMinPrice}
          valueFormatter={priceFormatter}
        />
        {" <=> "}
        <ButtonWithDropdown
          placeholder="Max Price"
          min={20000}
          max={1000000}
          stepSize={50000}
          g_onSelected={g_setMaxPrice}
          valueFormatter={priceFormatter}
        />
      </div>
      <div className="searchInputContainer">
        <ButtonWithDropdown
          placeholder="Beds"
          min={0}
          max={7}
          stepSize={1}
          g_onSelected={g_setMinBdr}
          valueFormatter={bedFormatter}
        />
      </div>
      <div className="searchInputContainer">
        <ButtonWithDropdown
          placeholder="Baths"
          min={0}
          max={7}
          stepSize={1}
          g_onSelected={g_setMinBath}
          valueFormatter={bathFormatter}
        />
      </div>
      <div className="searchInputContainer">
        <ButtonWithDropdown
          placeholder="Sq.Ft."
          min={300}
          max={12000}
          stepSize={300}
          g_onSelected={g_setMinSqft}
          valueFormatter={sqftFormatter}
        />
      </div>
      <div className="searchInputContainer">
        <label htmlFor="hasGarage">Garage Required:</label>
        <input
          type="checkbox"
          id="hasGarage"
          name="hasGarage"
          onClick={g_togglebHasGarage}
        />
      </div>
    </div>
  );
}
