import React from "react";

export default function NumberDropdown({
  min,
  max,
  stepSize,
  onSelect,
  valueFormatter
}) {
  console.log(min);
  let options = [];
  let largestVal = min;
  while (largestVal < max) {
    options.push(largestVal);
    largestVal += stepSize;
  }

  const onOptionSelected = value => {
    onSelect(value);
  };
  return (
    <ul className="autoCompleteBox">
      {options.map((value, id) => (
        <li
          className="suggestion"
          key={id}
          onClick={() => onOptionSelected(valueFormatter(value))}
        >
          {valueFormatter(value)}
        </li>
      ))}
    </ul>
  );
}
