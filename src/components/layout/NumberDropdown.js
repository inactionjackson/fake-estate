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
  while (largestVal <= max) {
    options.push(largestVal);
    largestVal += stepSize;
  }
  if (options[options.length - 1] !== max) {
    options.push(max);
  }

  return (
    <ul className="autoCompleteBox">
      {options.map((value, id) => (
        <li className="suggestion" key={id} onClick={() => onSelect(value)}>
          {valueFormatter(value)}
        </li>
      ))}
    </ul>
  );
}
