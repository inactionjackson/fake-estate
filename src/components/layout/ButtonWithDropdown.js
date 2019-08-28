import React, { useState } from "react";
import NumberDropdown from "./NumberDropdown";

export default function ButtonWithDropdown({
  placeholder,
  min,
  max,
  stepSize,
  g_onSelected,
  valueFormatter
}) {
  const [value, setValue] = useState(placeholder);
  const [showDropdown, setShowDropdown] = useState(false);

  const onSelected = newVal => {
    setValue(newVal);
    g_onSelected(newVal);
    toggleList();
  };
  const toggleList = () => {
    setShowDropdown(!showDropdown);
  };

  return (
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
  );
}
