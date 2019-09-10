import React, { useState, useEffect } from "react";
import NumberDropdown from "./NumberDropdown";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function ButtonWithDropdown({
  placeholder,
  min,
  max,
  stepSize,
  g_onSelected,
  valueFormatter,
  id
}) {
  const [value, setValue] = useState(placeholder);
  const [showDropdown, setShowDropdown] = useState(false);
  const activeDropdown = useStoreState(state => state.activeDropdown);
  const setActiveDropdown = useStoreActions(
    actions => actions.setActiveDropdown
  );
  const onSelected = newVal => {
    setValue(newVal);
    g_onSelected(newVal);
    toggleList();
  };
  const toggleList = () => {
    if (!showDropdown) {
      setActiveDropdown(id);
    } else if (activeDropdown === id) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    if (activeDropdown === id) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [activeDropdown]);

  return (
    <div className="searchInputContainer">
      <div className="dropdownContainer">
        <button onClick={toggleList}>
          <p>{valueFormatter(value)}</p>
          <span> &#x2228; </span>
        </button>
        {showDropdown && (
          <div className="clickCapture" onClick={toggleList}></div>
        )}
        {showDropdown && (
          <NumberDropdown
            min={min}
            max={max}
            stepSize={stepSize}
            onSelect={onSelected}
            valueFormatter={valueFormatter}
          />
        )}
      </div>
    </div>
  );
}
